import React from 'react'
import { Link } from 'react-router-dom';
import './style/Overview.css'

function Overview() {
  return (
    <div>

    <div className='bgoverview'>
      {/*link ใช้อันนี้ */}
      <Link to="/Register"><button className='register-buttonnn'>Register</button></Link> 
      <Link to="/Login"><button className='logins-button'>Login</button></Link>  
      

        <div className='logohotel'>

            <img className='logo' src={`${process.env.PUBLIC_URL}/image/logoo.png`} alt="logo" />

            <h1>CyberVista</h1>
            <h1>Hotel</h1>
            <p>Thailand</p>
        </div>

        <div className='midlogo'>
            <img className='logo' src={`${process.env.PUBLIC_URL}/image/logoo.png`} alt="logo" />
            <p>Let her go to the mountain,</p>
            <p>then we’ll escape to the sound of the waves at the sea.</p>
        </div>
    </div>

    <div className='text-inpired'>
        <div className='text-inpired-1'>
          <p>Inspired by the vibrant energy of Thailand and its breathtaking </p>
          <p>landscapes, CyberVista Hotel is </p>
          <p>thoughtfully designed to enhance wellness and inspire joy.</p>
        </div>

        <div className='text-inpired-2'>
          <h1>“OFTEN I THINK OF </h1>
          <h1>THE THRIVING CITY ... </h1>
          <h1>EMBRACED BY CULTURE AND NATURE”</h1>
        </div>

        <div className='text-inpired-3'>
          <h2>— Inspired by the spirit of</h2>
          <h2> exploration and creativity.</h2>
        </div>
    </div>

    <div className='ViewAuailavility'>

    </div>

    <div className='defined'>

    <div className='left-defined'>
        <img className='logo' src={`${process.env.PUBLIC_URL}/image/room.jpg`} alt="img" />
    </div>

    <div className='right-defined'>
      <div>
        <h1>DEFINED</h1>
        <h1>BY YOUR</h1>
        <h1>DESIRES</h1>
      
      <p>Each day at The  CyberVista Hotel can unfold in any way you wish. Start your morning with a flat white at Twinflower Café or energize with a ride on the Technogym Skillbike in the fitness center. In the afternoon, you might choose to relax by the pool or enjoy a spa session at Astraea. You can also explore the vibrant neighborhood filled with galleries and boutiques just outside the hotel, or take advantage of our luxury car service to visit key city attractions.
As the evening approaches, savor cocktails and light bites at Five of Clubs, either before or after dining at our in-house restaurant.
At the end of the day, retreat to your thoughtfully designed guestroom, where every detail has been carefully considered—luxurious spa-quality robes, unique alarm clocks, and optimal sleeping conditions certified by Sleep Wise Consulting.
No matter how you spend your time in this historic city, you’re sure to find a unique perspective—along with experiences that are both exactly what you expected and more than you anticipated.</p>

      <Link to="/Booknow"><button className='button-room'>Book Now</button></Link>   

      </div>

      </div>  
    </div>

    <div className='hotelCyberVista'>
      <div className='hotelCyberVista'>
        <div className='left-hotelCyberVista'>
          <div>
            <h2>HOTEL</h2>
            <h1>CYBERVISTA</h1>
          </div>
          <p>CyberVista Hotel feels both elevated and familiar, with refined guestrooms</p>
          <p>and suites, a wealth of thoughtful amenities, and enhancements crafted to</p>
          <p>make your experience unforgettable.</p>

          <Link to="/suites"><button className='button-room'>SUITES</button></Link>   
          <Link to="/standard"><button className='button-room'>STANDARD ROOM</button></Link>   
          <Link to="/grandstandard"><button className='button-room'>GRAND STANDARD ROOMM</button></Link>   

        </div>
        
        <div className='right-hotelCyberVista'>
          <img className='logo' src={`${process.env.PUBLIC_URL}/image/room.jpg`} alt="img" />
        </div>
        
      </div>
    </div>

    <div className='bang'></div>

    <div className='CafeandClubs'>

      <div className='left-CafeandClubs'>

        <div>
          <img className='logo' src={`${process.env.PUBLIC_URL}/image/logoo.png`} alt="logo" />
          <h1>Twinflower</h1>
          <h1>Café</h1>
          <h6>CyberVista Hotel</h6> 
        </div>

        <p>The nourishing menu at our café features fresh, wholesome fare for breakfast and lunch, including espresso, fresh juices, salads, sandwiches, and more.
        </p>

        <Link to="/cafe"><button className='button-room'>EXPLORE TWINFLOWER CAFÉ</button></Link>   

        
      </div>

      <div className='right-CafeandClubs'>

        <div>
          <img className='logo' src={`${process.env.PUBLIC_URL}/image/logoo.png`} alt="logo" />
          <h1>Five of Clubs</h1>
          <h6>at  CyberVista Hotel </h6>
        </div>

        <p>This intimate salon-style lounge offers classic cocktails, local beers from Portland breweries, and a curated wine list to go with chilled local seafood and charcuterie.
        </p>

        <Link to="/Clubs"><button className='button-room'>DISCOVER FIVE OF CLUBS</button></Link>   

        
      </div>
    </div>

    <div className='astraea'>

    <div className='left-astraea'>
      <div>
        <h1>ASTRAEA</h1>
        <h1>A WELLNESS SPA</h1>
      
      <p>Our approach to wellness centers around helping you feel your best, body and mind.</p>
      <p>Our menu is full of experiences ranging from our private infrared saunas to nurturing massage and body treatments and meditation. Our boutique is carefully curated with organic skincare, mindful journals, as well as beautiful items from local artisans to help you take a bit of the spa home with you.</p>
      
      <Link to="/suites"><button className='button-room'>BEGIN YOUR JOURNEY</button></Link>   
      <Link to="/standard"><button className='button-room'>BOOK NOW</button></Link>   
      <Link to="/grandstandard"><button className='button-room'>COUTACT US</button></Link>   

      </div>

      </div>  

      <div className='right-astraea'>
        <img className='logo' src={`${process.env.PUBLIC_URL}/image/room.jpg`} alt="img" />
    </div>

    </div>

    <div className='swimmingpool'>

    <div className='left-swimmingpool'>
        <img className='logo' src={`${process.env.PUBLIC_URL}/image/room.jpg`} alt="img" />
    </div>

    <div className='right-swimmingpool'>
      <div>
        <h1>Swimming Pool </h1>
        <h1>at The CyberVista Hotel</h1>
      
      <p>Dive into relaxation at our stunning outdoor swimming pool, where tranquility meets luxury. Surrounded by lush landscaping, our pool area offers a serene escape from the hustle and bustle of daily life. Whether you want to take a refreshing dip, soak up the sun on our comfortable loungers, or enjoy a leisurely swim, our pool caters to your every need.</p>
      <p>For those seeking a more invigorating experience, join our water aerobics classes or simply unwind with a good book by the water's edge. As evening falls, the pool transforms into a beautiful ambiance with softly lit surroundings, making it the perfect spot for a nightcap or an intimate gathering.</p>
      <p>For those seeking a more invigorating experience, join our water aerobics classes or simply unwind with a good book by the water's edge. As evening falls, the pool transforms into a beautiful ambiance with softly lit surroundings, making it the perfect spot for a nightcap or an intimate gathering.</p>
      </div>

      </div>  

    </div>

    <div className='fitness'>

    <div className='left-fitness'>
        <img className='logo' src={`${process.env.PUBLIC_URL}/image/room.jpg`} alt="img" />
    </div>

    <div className='right-fitness'>
      <div>
        <h1>Swimming Pool </h1>
        <h1>at The CyberVista Hotel</h1>
      
      <p>Dive into relaxation at our stunning outdoor swimming pool, where tranquility meets luxury. Surrounded by lush landscaping, our pool area offers a serene escape from the hustle and bustle of daily life. Whether you want to take a refreshing dip, soak up the sun on our comfortable loungers, or enjoy a leisurely swim, our pool caters to your every need.</p>
      <p>For those seeking a more invigorating experience, join our water aerobics classes or simply unwind with a good book by the water's edge. As evening falls, the pool transforms into a beautiful ambiance with softly lit surroundings, making it the perfect spot for a nightcap or an intimate gathering.</p>
      <p>For those seeking a more invigorating experience, join our water aerobics classes or simply unwind with a good book by the water's edge. As evening falls, the pool transforms into a beautiful ambiance with softly lit surroundings, making it the perfect spot for a nightcap or an intimate gathering.</p>
      </div>

      </div>  

      
    </div>

    <div className='bang'></div>

    <div className='footer'>

    </div>



    </div>

  )
}

export default Overview
