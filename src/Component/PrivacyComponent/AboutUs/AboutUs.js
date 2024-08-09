import React from 'react'
import imgf from "./founder.jpg"
import img1 from "./pic1.jpg"
import img2 from "./pic2.jpg"
import img3 from "./pic3.jpg"
import img4 from "./pic4.jpg"
import img5 from "./pic5.jpg"
import img6 from "./pic6.jpg"
import img7 from "./pic7.jpg"
import img8 from "./pic8.jpg"


const AboutUs = () => {
  return (
    <div>
      <div className='flex flex-col items-center p-2 mt-[3%]'>
        <img src={imgf}
          alt="not fount"
          style={{ height: 160, width: 160 }}
          className='rounded-[50%]'
        />
        <div>
          <strong> Founder</strong> & <strong>CEO</strong>
        </div>
        <div>
          <strong> Aditya Ranjan</strong>
        </div>
        <div>
          <strong> IIIT Ranchi Graduate (CSE)</strong>
        </div>
      </div>

      <div className='text-7xl flex justify-center mt-[4%]'>
        <strong>Meet Our Leadership Team</strong>
      </div>

      <div className='flex flex-col items-center'>
        <div className='flex flex-row justify-center gap-10'>
          <div className='flex flex-col items-center p-2 mt-[3%]'>
            <img src={img1}
              alt="not fount"
              style={{ height: 120, width: 120 }}
              className='rounded-[50%]'
            />
            <div>
              <strong> Head of Operation</strong>
            </div>
            <div>
              <strong>Robert William</strong>
            </div>
            <div>
              <strong> Ex- Google</strong>
            </div>
          </div>

          <div className='flex flex-col items-center p-2 mt-[3%]'>
            <img src={img7}
              alt="not fount"
              style={{ height: 120, width: 120 }}
              className='rounded-[50%]'
            />
            <div>
              <strong>Human Resoure Manager</strong>
            </div>
            <div>
              <strong>Soumya Singh</strong>
            </div>
            <div>
              <strong> Ex-Meta</strong>
            </div>
          </div>

          <div className='flex flex-col items-center p-2 mt-[3%]'>
            <img src={img3}
              alt="not fount"
              style={{ height: 120, width: 120 }}
              className='rounded-[50%]'
            />
            <div>
              <strong> Product Manager</strong>
            </div>
            <div>
              <strong>Jackson Lee</strong>
            </div>
            <div>
              <strong> Ex- Alibaba</strong>
            </div>
          </div>

          <div className='flex flex-col items-center p-2 mt-[3%]'>
            <img src={img4}
              alt="not fount"
              style={{ height: 120, width: 120 }}
              className='rounded-[50%]'
            />
            <div>
              <strong> Development Lead</strong>
            </div>
            <div>
              <strong>Ankit Rajpoot</strong>
            </div>
            <div>
              <strong> Ex- nvidia</strong>
            </div>
          </div>
        </div>

        <div className='flex flex-row justify-center gap-10'>
          <div className='flex flex-col items-center p-2 mt-[3%]'>
            <img src={img8}
              alt="not fount"
              style={{ height: 120, width: 120 }}
              className='rounded-[50%]'
            />
            <div>
              <strong> Chief Financial Officer</strong>
            </div>
            <div>
              <strong> Akriti Agrawal</strong>
            </div>
            <div>
              <strong> Ex- Amazon</strong>
            </div>
          </div>

          <div className='flex flex-col items-center p-2 mt-[3%]'>
            <img src={img2}
              alt="not fount"
              style={{ height: 120, width: 120 }}
              className='rounded-[50%]'
            />
            <div>
              <strong> Production Team Lead</strong>
            </div>
            <div>
              <strong>Anmol Sehrawat</strong>
            </div>
            <div>
              <strong> Ex- media.net</strong>
            </div>
          </div>

          <div className='flex flex-col items-center p-2 mt-[3%]'>
            <img src={img6}
              alt="not fount"
              style={{ height: 120, width: 120 }}
              className='rounded-[50%]'
            />
            <div>
              <strong>Operation Team Lead</strong>
            </div>
            <div>
              <strong>krish Zordan</strong>
            </div>
            <div>
              <strong> Ex-Walmart</strong>
            </div>
          </div>

          <div className='flex flex-col items-center p-2 mt-[3%]'>
            <img src={img5}
              alt="not fount"
              style={{ height: 120, width: 120 }}
              className='rounded-[50%]'
            />
            <div>
              <strong> Co-Founder</strong>
            </div>
            <div>
              <strong> Aman Bansal</strong>
            </div>
            <div>
              <strong> Ex- Apple</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs