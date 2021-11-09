import React from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const RevenueChart = ({ order, selectedTime, selectWeek }) => {
  let revenue = [];
  let labels = [];

  //* for day
  if (selectedTime === 'day') {
    const Newrevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const hours = [
      '0AM',
      '2AM',
      '4AM',
      '6AM',
      '8AM',
      '10AM',
      '12AM',
      '0PM',
      '2PM',
      '4PM',
      '6PM',
      '8PM',
      '10PM',
      '12PM',
    ];

    //* making filterDay
    const filterDay = [];
    for (let i = 0; i <= 24; i += 2) {
      filterDay.push(moment.utc().add(selectWeek, 'days').hour(i).minute(0).second(0).format());
    }
    //* making revenue for day
    order.forEach((item) => {
      for (let i = 0; i < 12; i++) {
        if (
          new Date(item.paidAt).getTime() >= new Date(filterDay[i]).getTime() &&
          new Date(item.paidAt).getTime() < new Date(filterDay[i + 1]).getTime()
        ) {
          Newrevenue[i] += +item.amount;
        }
      }
    });
    revenue = [...Newrevenue];
    labels = [...hours];
  }

  //* for week
  if (selectedTime === 'week') {
    const Newrevenue = [0, 0, 0, 0, 0, 0, 0];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    labels = [...days];
    order.forEach((item) => {
      //making revenue for week
      const day = new Date(item.paidAt).getDay();
      Newrevenue[day] += +item.amount;
    });
    revenue = [...Newrevenue];
  }

  //* for month
  if (selectedTime === 'month') {
    const date = new Date();
    const thisMonth = date.getMonth() + 1;
    const thisYear = date.getFullYear();
    //* find weeks in month
    const firstDay = new Date(thisYear, thisMonth - 1 + selectWeek, 1).getDay(); //which day
    const daysInMonth = new Date(thisYear, thisMonth + selectWeek, 0).getDate();
    const weeksInMonth = Math.ceil((daysInMonth + firstDay - 7) / 7) + 1;

    //* build Newrevenue [0,0,0,0,0]
    const Newrevenue = [];
    for (let i = 1; i <= weeksInMonth - 1; i++) {
      Newrevenue.push(0);
    }

    //* making filterWeek
    const filterWeek = [];
    const weeksInYear = moment(`${thisYear}-${thisMonth + selectWeek}-1`).week();
    for (let i = 0; i <= weeksInMonth; i++) {
      filterWeek.push(
        moment
          .utc()
          .week(weeksInYear)
          .day(0 + 7 * i)
          .hour(0)
          .minute(0)
          .second(0)
          .format()
      );
    }
    //* making revenue for month
    order.forEach((item) => {
      for (let i = 0; i < weeksInMonth - 1; i++) {
        if (
          new Date(item.paidAt).getTime() >= new Date(filterWeek[i]).getTime() &&
          new Date(item.paidAt).getTime() < new Date(filterWeek[i + 1]).getTime()
        ) {
          Newrevenue[i] += +item.amount;
        }
      }
    });

    revenue = [...Newrevenue];
    for (let i = 1; i <= weeksInMonth - 1; i++) {
      labels.push(`Week${i}`);
    }
  }

  //* for year
  if (selectedTime === 'year') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const newRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    order.forEach((item) => {
      newRevenue[new Date(item.paidAt).getMonth()] += +item.amount;
    });
    revenue = [...newRevenue];
    labels = months;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'revenue ($)',
        data: revenue,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 122, 243, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 122, 243, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 122, 243, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 122, 243, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default RevenueChart;
