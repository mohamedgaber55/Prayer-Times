export default function Time(props){
    return(
        <div>
            <div className="flex items-center justify-between bg-(--main-color) rounded-sm p-3 border border-(--border-color) my-2">
                <p>{props.name}</p>
                <p>{props.time}</p>
            </div>
        </div>
    )
}