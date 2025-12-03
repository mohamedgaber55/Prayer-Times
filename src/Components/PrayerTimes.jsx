import { useEffect, useState } from "react"
import Time from "./Time";

export default function PrayerTime(){

  // states to store data 
  const [times, setTimes] = useState({});
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  
  // get tody date 
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // because monthes start from 0
  const year = today.getFullYear();

  const todyDate = `${day}-${month}-${year}`;

  // get data from api
  useEffect( ()=>{
    try{
        fetch(`https://api.aladhan.com/v1/timingsByCity/${todyDate}?city=Eg&country=${city ? city : 'Cairo'}`)
        .then((res) => res.json())
        .then((data) => {
          setTimes(data.data.timings);
          setDate(data.data.date.gregorian.date);
        })
    }
    catch(err){
      console.log(err)
    }
  },[city, todyDate]);

  // transfer time from 24 to 12
  const from24To12 = (time24) => {

    if(!time24) return '--:--';
    // split time 
    const [hours, minutes] = time24.split(":");
    // transfer from str to num 
    let hour = parseInt(hours, 10);
    // pm or am shoud be after mod
    const pmOrAm = hour >= 12 ? 'مساءً' : 'صباحًا';
    // most important of this function that transfer from 24 to 12
    hour = hour % 12 || 12

    // return
    return `${hour}:${minutes} ${pmOrAm}`

  }

  console.log(date)

  // cities 
  const cities = {
    'Cairo': 'القاهرة',
    'Beni Suef': 'بنى سويف',
    'Alexandria': 'الاسكندرية',
    'Mansoura': 'المنصورة',
    'Tanta': 'طنطا',
    'Damietta': 'دمياط',
    'Mahalla': 'المحلة',
    'Ismailia': 'الاسماعلية',
    'Luxor': 'الاقصر',
    'Aswan': 'اسوان',
  }

  // map on cities
  const citiesObjMap = Object.entries(cities);

  const citiesMap = citiesObjMap.map( ( [key, city] , index ) => 
    <option key={index} value={key}>{city}</option>
  )

  // times not from api cause we needn't more than this times 
  const names = {
    Fajr: 'الفجر :',
    Dhuhr: 'الظهر :',
    Asr: 'العصر :',
    Maghrib: 'المغرب :',
    Isha: 'العشاء :',
  }

  return(
    <div className=" text-right bg-(--blured-color) backdrop-blur-[10px] max-w-[550px] p-10 border border-(--border-color) rounded-xl">
      <div className="flex justify-between flex-wrap border-b border-b-(--border-color) p-3 pb-5 pr-0">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="focus:outline-none w-[300px] bg-(--main-color) rounded-[4px] p-2 border border-(--border-color) outline-0">
          {citiesMap}
        </select>
        <div className="flex justify-between mt-4 sm:mt-0 sm:block">
          <p>التاريخ :</p>
          <p className="mr-2 sm:mr-0">{date}</p>
        </div>

    </div>
    <div className="body mt-5">
      <Time name={names.Fajr} time={from24To12(times.Fajr) || "--:--"}/>
      <Time name={names.Dhuhr} time={from24To12(times.Dhuhr) || "--:--"}/>
      <Time name={names.Asr} time={from24To12(times.Asr) || "--:--"}/>
      <Time name={names.Maghrib} time={from24To12(times.Maghrib) || "--:--"}/>
      <Time name={names.Isha} time={from24To12(times.Isha) || "--:--"}/>
    </div>
    </div>
  )
}
