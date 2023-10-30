import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase";
import { addProduct } from "../../Redux/apiCalls";
import { useDispatch } from "react-redux";
import { resetProducts } from "../../Redux/productRedux";

export default function NewProduct() {

  const [inputs, setinputs] = useState({})

  const [file, setfile] = useState(null)

  const [cat, setCat] = useState([])

  const [color, setcolor] = useState([])
  const [size, setsize] = useState([])

  
  const handleChange = (e) => {
    setinputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleCat = (e) => {
      setCat(e.target.value.split(','))
  }

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    const filename = new Date().getTime() + file.name
    
    const storage = getStorage(app)
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
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
            break;
          
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>  {
          console.log('File available at', downloadURL);
          

          const product = { ...inputs, img: downloadURL, categories: cat, color, size }
         addProduct(product, dispatch)
          // Reset the states
          setinputs({});
          setcolor([]);
          setsize([]);
          setCat([]);
          setfile(null);

        });
      }
    );

  } 


  return (


    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">

        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setfile(e.target.files[0])} />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="Add new item Details.." onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="Price..($80)" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Jeans, Coats, Shirts" onChange={handleCat} />
        </div>

        <div className="addProductItem">
          <label>Size</label>
          <input name="size" type="text" placeholder="S M L XL XLL.." onChange={(e) => setsize(e.target.value.split(','))} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input name='color' type="text" placeholder="Color.." onChange={(e)=>setcolor(e.target.value.split(','))} />
        </div>

        <div className="addProductItem">

          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>

          </select>

        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
