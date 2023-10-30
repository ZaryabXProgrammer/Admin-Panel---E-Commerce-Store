import { useEffect, useState } from "react";
import "./widgetLg.css";
import { userRequest } from '../../requestMethods'
import {format} from 'timeago.js'

export default function WidgetLg() {


  const [orders, setorders] = useState([])
  
  useEffect(() => {
   
    const getOrders = async () => {
  
      try {
    
        await userRequest.get('orders/find').then((res) => {
          setorders(res.data)
        })

  } catch (error) {
    console.log(error)
  }

    }
    
    getOrders()

  }, [])
  

  const Button = ({ type }) => {
    return <button style={{ textTransform: 'capitalize' }
    } className={"widgetLgButton " + type}>{type}</button>;
  };

  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>

        {orders.map((order) => (
          <tr key={order.userId} className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://cdn3.iconfinder.com/data/icons/users-retro/60/50_-Blank_Profile-_user_people_group_team-512.png"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{order.username || order.userId.slice(0,10)}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt )}</td>

            <td className="widgetLgAmount">${order.amount.toFixed(2)}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>))
         
        }
{/* 
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>

        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr>

        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr> */}

      </table>
    </div>
  );
}
