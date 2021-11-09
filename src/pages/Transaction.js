import axios from '../config/axios';
import React, { useEffect, useState } from 'react';
import RevenueChart from '../component/transaction/RevenueChart';
import moment from 'moment';
import AdminHeader from '../component/AdminHeader';

function Transaction() {
  const [selectedTime, setSelectedTime] = useState('day');
  const [order, setOrder] = useState([]);
  const [showTime, setShowTime] = useState([]);
  const [selectWeek, setSelectWeek] = useState(0);
  const [showSumIncome, setShowSumIncome] = useState(0);
  const [percent, setPercent] = useState(0);
  const [sortCategoryResult, setSortCategoryResult] = useState([]);

  useEffect(() => {
    setSelectWeek(0);
  }, [selectedTime]);

  useEffect(() => {
    try {
      const run = async () => {
        //* making startTime and endTime for getting data
        let startTime = {};
        let endTime = {};
        const date = new Date();
        const thisDate = date.getDate();
        const thisMonth = date.getMonth() + 1;
        const thisYear = date.getFullYear();
        const daysInMonth = new Date(thisYear, thisMonth, 0).getDate(); //number type

        //* day
        if (selectedTime === 'day') {
          startTime = new Date();
          startTime.setHours(0, 0, 0, 0);
          startTime.setDate(thisDate + selectWeek);
          endTime = new Date();
          endTime.setDate(thisDate + selectWeek);
        }
        //* week
        if (selectedTime === 'week') {
          startTime = moment()
            .day(0 + 7 * selectWeek)
            .hour(0)
            .minute(0)
            .second(0)
            .format()
            .split('+')[0];
          endTime = moment()
            .day(7 + 7 * selectWeek)
            .hour(0)
            .minute(0)
            .second(0)
            .format()
            .split('+')[0];
        }

        //* month
        if (selectedTime === 'month') {
          const firstDay = new Date(thisYear, thisMonth - 1 + selectWeek, 1).getDay(); //which day
          const daysInMonth = new Date(thisYear, thisMonth + selectWeek, 0).getDate();
          const weeksInMonth = Math.ceil((daysInMonth + firstDay - 7) / 7) + 1;
          const weeksInYear = moment(`${thisYear}-${thisMonth + selectWeek}-1`).week();
          startTime = moment().week(weeksInYear).day(0).hour(0).minute(0).second(0).format().split('+')[0];
          endTime = moment()
            .week(weeksInYear)
            .day(7 * (weeksInMonth - 1))
            .hour(0)
            .minute(0)
            .second(0)
            .format()
            .split('+')[0];
        }

        //* year
        if (selectedTime === 'year') {
          startTime = moment()
            .year(thisYear + selectWeek)
            .month(0)
            .date(1)
            .hour(0)
            .minute(0)
            .second(0)
            .format()
            .split('+')[0];
          endTime = moment()
            .year(thisYear + selectWeek)
            .month(12)
            .date(0)
            .hour(0)
            .minute(0)
            .second(0)
            .format()
            .split('+')[0];
        }
        const {
          data: { order, percent, sortCategoryResult },
        } = await axios.get(`/transaction?startTime=${startTime}&endTime=${endTime}&selectedTime=${selectedTime}`);
        setOrder(order);
        setPercent(percent);
        setSortCategoryResult(sortCategoryResult);

        //* set showtime
        selectedTime === 'day' ||
          setShowTime([startTime.split('T')[0].split('-').join('/'), endTime.split('T')[0].split('-').join('/')]);
        selectedTime === 'day' && setShowTime([startTime.toDateString(), endTime.toDateString()]);

        //* set income
        setShowSumIncome(order.reduce((acc, item) => acc + +item.amount, 0).toFixed(2));
      };
      run();
    }
    catch (err) {
      console.log(err.message)
    }
  }, [selectWeek, selectedTime]);

  const topFiveColor = ['#DF316E', '#40C9BA', '#98C6FF', '#9F7DE1', '#FEDF9A'];
  const categoryImg = {
    Foundation: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998904/Foundation_phqyge.jpg',
    Concealer: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998904/Concealer_aocfpl.png',
    Powder: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Lip_Balm_jck6hf.png',
    Primer: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Primer_fkjcm3.jpg',
    'Eye Brows': 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Eyebrows_jfxtxf.png',
    'Eye Liner': 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998904/Eyeliner_np6msk.png',
    'Eye Shadow': 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Eyeshadow_bdtaa7.png',
    Mascara: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Mascara_oyfzhv.png',
    'Lip Blam': 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Lip_Balm_jck6hf.png',
    'Lip Liner': 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Lip_Liner_vuizz8.png',
    'Lip Stick': 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Libstick_dt5dbz.png',
    'Liquid Lipstick': 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Liquid_Lip_ipjiux.png',
    Blush: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998899/Blush_kv89pz.jpg',
    Bronzer: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998904/Bronzer_ngvzby.jpg',
    Highlighter: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998905/Highlighter_mc29py.jpg',
    BodyMakeup: 'https://res.cloudinary.com/dtwk9plkp/image/upload/v1634998903/Body_cd2xfp.png',
  };

  return (
    <div className='transactionPage'>
      <AdminHeader />
      <div className='container' style={{ width: '80vw' }}>
        {' '}
        {/*revenue*/}
        <div className='my-5 p-4'>
          <div className='row'>
            <h4 style={{ fontSize: '28px' }}>REVENUE</h4>
          </div>
          <div className='row'>
            <div className='col-8 card my-2'>
              {' '}
              {/*graph*/}
              <div className='row d-flx justify-content-end'>
                {' '}
                {/*selector*/}
                <select
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={{ width: '10vw', textAlign: 'center' }}
                  className='form-select'
                >
                  <option value='day'>
                    Day
                  </option>
                  <option value='week'>Week</option>
                  <option value='month'>Month</option>
                  <option value='year'>Year</option>
                </select>
              </div>
              <div className='row px-4'>
                {' '}
                {/*INCOME*/}
                <div>
                  <h5 style={{ fontSize: '24px' }}>INCOME</h5>
                  <div className='row'>
                    <div className='d-flex align-items-center col-4'>
                      <h6 className='m-0' style={{ fontSize: '24px' }}>{`$${showSumIncome}`}</h6>
                      <i
                        className={`ms-2 text-${percent >= 0 ? 'success' : 'danger'} fs-3 bi bi-caret-${percent >= 0 ? 'up' : 'down'
                          }-fill`}
                      ></i>
                      <p
                        className={`m-0 text-${percent >= 0 ? 'success' : 'danger'}`}
                        style={{ fontSize: '24px' }}
                      >{`${percent}%`}</p>
                    </div>
                    <div className='col-8 d-flex align-items-center justify-content-center flex-nowrap'>
                      <span>
                        <i
                          onClick={() => setSelectWeek((cur) => cur - 1)}
                          className='fs-5 btn mx-2 bi bi-chevron-left'
                        ></i>
                      </span>
                      <span style={{ fontSize: '24px' }}>
                        {selectedTime === 'day' ? `${showTime[0]}` : `${showTime[0]} - ${showTime[1]}`}
                      </span>{' '}
                      {/*showtime*/}
                      <span>
                        <i
                          onClick={() => setSelectWeek((cur) => cur + 1)}
                          className='fs-5 btn mx-2 bi bi-chevron-right'
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className='p-3'>
                    <RevenueChart order={order} selectedTime={selectedTime} selectWeek={selectWeek} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-4'>
              {' '}
              {/*best seller*/}
              <div className='my-2 mx-5 d-flex flex-column justify-content-center align-items-center'>
                <h4 style={{ fontSize: '24px' }}>{`BEST SELLER (${selectedTime})`}</h4>
                {sortCategoryResult.map((item, index) => {
                  if (index >= 5) return;
                  return (
                    <div
                      className='ms-5 d-flex justify-content-start align-items-center'
                      style={{ width: '150px', height: '70px' }}
                      key={index}
                    >
                      {' '}
                      {/*bs item*/}
                      <div
                        className='me-4 rounded-pill'
                        style={{
                          width: '1vw',
                          height: '3.125vw',
                          backgroundColor: topFiveColor[index],
                          opacity: '50%',
                        }}
                      ></div>
                      <div className='d-flex flex-column align-items-start justify-content-between'>
                        <p className='m-0' style={{ fontSize: '18px' }}>
                          {item?.[0]}
                        </p>
                        <p className='m-0' style={{ fontSize: '24px' }}>{`$${item?.[1]}`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container' style={{ width: '80vw', marginBottom: '6vw' }}>
        {' '}
        {/*Previous Transaction*/}
        <div className=' p-4 m-4' style={{ backgroundColor: '#FEF3F5' }}>
          <div className='d-flex align-items-center mt-4 mb-5'>
            <h4>PREVIOUS TRANSACTIONS</h4>
            <div
              style={{ height: '4vw', backgroundColor: '#FFD6DC' }}
              className='badge mx-4 d-flex align-items-center justify-content-center'
            >
              <span style={{ fontSize: '16px' }}>
                {selectedTime === 'day' ? `${showTime[0]}` : `${showTime[0]} - ${showTime[1]}`}
              </span>
            </div>
          </div>
          {sortCategoryResult.map((item, index) => {
            if (!item[1]) return;
            return (
              <div className='card border-0 my-4' key={index}>
                {' '}
                {/*trans item*/}
                <div
                  className='p-4 d-flex align-items-center justify-content-between'
                  style={{ width: '70vw', height: '7vw' }}
                >
                  <div className='d-flex align-items-center m-5'>
                    <img
                      className='mx-4'
                      style={{
                        width: '5vw',
                        height: '5vw',
                        borderRadius: '50%',
                      }}
                      src={categoryImg[item?.[0]]}
                      alt=''
                    />
                    <p className='m-0 mx-4 fw-bold'>{item[0]}</p>
                  </div>
                  <p className='m-0 mx-4 text-success fw-bold'>{`+$${item[1]}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Transaction;
