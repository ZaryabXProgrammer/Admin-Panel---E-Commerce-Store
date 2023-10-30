import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";

import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {

  const [userStats, setuserStats] = useState([])


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


        const res = await userRequest.get('user/stats');
        console.log(res.data)
        const list = Object.values(res.data).sort((a,b)=>(a._id - b._id)) //now list is an array we can use map over here
       
        setuserStats(prev => [
          ...prev,
          ...list.map((item) => (
            {
              name: MONTHS[item._id-1], 'Active User': item.total
            }
          ))
        ]) //creating an new array with the previous array properties to it



      } catch (err) {
        console.error(err);
      }
    };

    getStats(); // Call the getStats function to make the API request.

  }, []);


  return (
    <div className="home">
      <FeaturedInfo />


      
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
      
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
