import './App.css'
import PrayerTime from './Components/PrayerTimes'

function App() {

  return (
    <div className='prayer'>
    <div className='container mx-auto px-4'>
      <div className="main-header flex justify-center items-center p-0 mb-7 sm:mb-3 ">
        <h1 className='
            font-bold
            flex justify-center
            mb-2 bg-(--blured-color)
            backdrop-blur-[10px]
            rounded-b-4xl px-10 py-3
            border border-(--border-color)'
          >مواقيت الصلاة فى مصر</h1>
      </div>
      <div className='main text-right'> 
        <PrayerTime />
      </div>
    </div>
    </div>
  )
}

export default App
