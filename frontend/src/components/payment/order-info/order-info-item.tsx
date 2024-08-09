export const OrderInfoItem = ({ title, value, isStrong}) => {
    return(
        <div className="flex justify-between items-center text-sm text-dark mb-2">
            <h3 className={`${isStrong ? 'font-bold': ''}`}> {title} </h3>
            <span className={`${isStrong ? 'text-secondary font-bold': ''}`}> ${ value }</span>
        </div>
    )
}
