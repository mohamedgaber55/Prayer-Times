import { useEffect, useState } from "react"
import Time from "./Time";

export default function PrayerTime(){

  // states to store data 
  const [times, setTimes] = useState({});
  const [dateM, setDateM] = useState('');
  const [dateH, setDateH] = useState('');
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
          setDateM(data.data.date.gregorian.date);
          setDateH(data.data.date.hijri.date);
          console.log(data.data);
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

  // cities 
const cities = {
  'Cairo': 'القاهرة',
  'Beni Suef': 'بنى سويف',
  'Alexandria': 'الاسكندرية',
  'Giza': 'الجيزة',
  'Port Said': 'بورسعيد',
  'Suez': 'السويس',
  'Luxor': 'الأقصر',
  'Aswan': 'أسوان',
  'Ismailia': 'الإسماعيلية',
  'Tanta': 'طنطا',
  'Mansoura': 'المنصورة',
  'Zagazig': 'الزقازيق',
  'Shubra El-Kheima': 'شبرا الخيمة',
  'Damanhur': 'دمنهور',
  'El-Mahalla El-Kubra': 'المحلة الكبرى',
  'Faiyum': 'الفيوم',
  'Minya': 'المنيا',
  'Sohag': 'سوهاج',
  'Asyut': 'أسيوط',
  'Damietta': 'دمياط',
  'Qena': 'قنا',
  'Hurghada': 'الغردقة',
  'El-Arish': 'العريش',
  'Banha': 'بنها',
  'Helwan': 'حلوان',
  'El-Mansoura': 'المنصورة',
  '10th of Ramadan': 'العاشر من رمضان',
  'Sadat City': 'مدينة السادات'
}


  // map on cities
  const citiesObjMap = Object.entries(cities);

  const citiesMap = citiesObjMap.map( ( [key, city] , index ) => 
    <option key={index} value={key} className="text-blue-950">{city}</option>
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
    <div className=" text-right bg-(--blured-color) backdrop-blur-[10px] max-w-[550px] p-5 pt-10 border border-(--border-color) rounded-xl">
      <div className="flex justify-between flex-wrap border-b border-b-(--border-color) pb-3 pr-0">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="focus:outline-none h-[50px] w-100 bg-(--main-color) rounded-[5px] p-2 border border-(--border-color) outline-0">
          {citiesMap}
        </select>
        <div className="mt-4 sm:flex justify-between w-full">
          <p className="mr-2 sm:mr-0">التاريخ الميلادى :  {dateM}</p>
          <p className="mr-2 sm:mr-0">التاريخ الهجرى : {dateH}</p>
        </div>

    </div>
    <div className="body mt-4">
      <Time name={names.Fajr} time={from24To12(times.Fajr) || "--:--"}/>
      <Time name={names.Dhuhr} time={from24To12(times.Dhuhr) || "--:--"}/>
      <Time name={names.Asr} time={from24To12(times.Asr) || "--:--"}/>
      <Time name={names.Maghrib} time={from24To12(times.Maghrib) || "--:--"}/>
      <Time name={names.Isha} time={from24To12(times.Isha) || "--:--"}/>

      <div className="mt-4 sm:flex justify-between w-full">
        <p>الشروق: {from24To12(times.Sunrise) || "--:--"}</p>
        <p>الغروب: {from24To12(times.Sunset) || "--:--"}</p>
      </div>

    </div>
    </div>
  )
}
