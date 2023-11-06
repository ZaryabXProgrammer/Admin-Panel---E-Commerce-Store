import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase";

import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../Redux/apiCalls";

export default function Product() {


    const location = useLocation()

    const productId = location.pathname.split('/')[2]


    const persistedUserData = JSON.parse(localStorage.getItem('persist:root'))

    const productData = JSON.parse(persistedUserData.product).products

    const product = productData.find((item) => item._id === productId);
    const [updatedProduct, setupdatedProduct] = useState(product)
    const [uploading, setuploading] = useState(false)

    // console.log(product1)

    // const product = useSelector((state) =>
    //     state.product.products ?
    //         state.product.products.find((item) => item._id === productId) : null
    // );

    const [pStats, setpStats] = useState([]);


    const MONTHS = useMemo(

        () => [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
        ]
    )

    useEffect(() => {

        const getStats = async () => {

            try {

                const res = await userRequest.get('orders/income?pid=' + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })

                setpStats(prev => [
                    ...prev,
                    ...list.map((item) => (
                        {
                            name: MONTHS[item._id - 1], Sales: item.total
                        }
                    ))
                ]) //creating an new array with the previous array properties to it



            } catch (err) {
                console.error(err);
            }
        };

        getStats(); // Call the getStats function to make the API request.

    }, [productId]);



    const [file, setfile] = useState(null)
    const [inputs, setinputs] = useState('')


    const dispatch = useDispatch()

    const handleChange = (e) => {

        e.preventDefault()

        setinputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })



    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentProductId = productId;
        const filename = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

        console.log('Upload task started'); // Log when the upload task starts

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        
                        console.log('Upload is running');
                        setuploading(true)
                        
                        break;
                    default:
                }
            },
            (error) => {
                console.error('Upload task failed:', error); // Log errors in the upload task
            },
            () => {
                console.log('Upload task completed');
                setuploading(false)// Log when the upload task is completed
                // Handle successful uploads on complete
                // For instance, get the download URL
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        const product = { ...inputs, img: downloadURL.toString() };
                        updateProduct(currentProductId, product, dispatch);
                        setupdatedProduct(product)
                        console.log(product);
                        // Reset the states
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                    });
            }
        );
    };


    // console.log(inputs)
    // console.log(file)
    // return (

    //     <div className="product">

    //         <div className="productTitleContainer">
    //             <h1 className="productTitle">Product</h1>
    //             <Link to="/newproduct">
    //                 <button className="productAddButton">Create</button>
    //             </Link>
    //         </div>
    //         <div className="productTop">
    //             <div className="productTopLeft">
    //                 <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
    //             </div>
    //             { product &&
    //                 <div className="productTopRight">

    //                     <div className="productInfoTop">

    //                         <img src={product?.img} alt="" className="productInfoImg" />

    //                         <span className="productName">{product?.title}</span>

    //                     </div>

    //                     <div className="productInfoBottom">
    //                         <div className="productInfoItem">
    //                             <span className="productInfoKey">{product._id.slice(0, 5)}...</span>
    //                             <span className="productInfoValue">${product?.price}</span>
    //                         </div>
    //                         {/* <div className="productInfoItem">
    //                         <span className="productInfoKey">Sales:</span>
    //                         <span className="productInfoValue">5123</span>
    //                     </div> */}
    //                         <div className="productInfoItem">
    //                             <span className="productInfoKey">Active:</span>
    //                             <span className="productInfoValue">Yes</span>
    //                         </div>
    //                         <div className="productInfoItem">
    //                             <span className="productInfoKey">In Stock:</span>
    //                             <span className="productInfoValue">{product.inStock ? 'Yes' : 'No'}</span>
    //                         </div>
    //                     </div>

    //                 </div>
    //             }

    //         </div>

    //         <div className="productBottom">

    //             { product &&

    //             <form className="productForm">

    //                 <div className="productFormLeft">
    //                     <label>{product?.title}</label>

    //                     <input name="title" type="text" placeholder="Apple AirPod" onChange={handleChange} />

    //                     <label>{product?.inStock ? 'inStock' : 'Out Of Stock'}</label>

    //                     <select name="inStock" id="idStock" onChange={handleChange}>
    //                         <option value="true">Yes</option>
    //                         <option value="false">No</option>
    //                     </select>

    //                     {/* <label>Active</label>

    //                     <select name="active" id="active">
    //                         <option value="yes">Yes</option>
    //                         <option value="no">No</option>
    //                     </select> */}

    //                 </div>

    //                 <div className="productFormRight">
    //                     <div className="productUpload">
    //                         <img src={product?.img} alt="" className="productUploadImg" />
    //                         <label htmlFor="file"  >
    //                             <Publish />
    //                         </label>
    //                         <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setfile(e.target.files[0])} />
    //                     </div>
    //                     <button className="productButton" onClick={handleSubmit}>Update</button>
    //                 </div>
    //             </form>
    //             }
    //         </div>
    //     </div>

    // );
    return (


        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>

                {product && (
                    <div className="productTopRight">
                        <div className="productInfoTop">
                            <img src={updatedProduct?.img} alt="" className="productInfoImg" />
                            <span className="productName">{updatedProduct?.title}</span>
                        </div>
                        <div className="productInfoBottom">
                            <div className="productInfoItem">
                                <span className="productInfoKey">
                                    {product._id.slice(0, 5)}...
                                </span>
                                <span className="productInfoValue">${updatedProduct?.price}</span>
                            </div>
                            <div className="productInfoItem">
                                <span className="productInfoKey">Active:</span>
                                <span className="productInfoValue">Yes</span>
                            </div>
                            <div className="productInfoItem">
                                <span className="productInfoKey">In Stock:</span>
                                <span className="productInfoValue">
                                    {updatedProduct.inStock ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {product && (
                <div className="productBottom">
                    <form className="productForm">
                        <div className="productFormLeft">
                            <label>{updatedProduct?.title}</label>
                            <input
                                name="title"
                                type="text"
                                placeholder="Apple AirPod"
                                onChange={handleChange}
                            />
                            <label>{updatedProduct?.inStock ? 'inStock' : 'Out Of Stock'}</label>
                            <select name="inStock" id="idStock" onChange={handleChange}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="productFormRight">
                            <div className="productUpload">
                                <img src={updatedProduct?.img} alt="" className="productUploadImg" />
                                <label htmlFor="file">
                                    <Publish />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setfile(e.target.files[0])}
                                />
                            </div>
                            <button className="productButton" onClick={handleSubmit}>
                                Update
                            </button>

                            {uploading && <span style={{ fontSize: '100x', fontWeight: 'bold', marginTop: '5px' }}>Uploading... Please Wait.</span>}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
