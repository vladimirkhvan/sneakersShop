import styles from "./Info.module.scss"

export default Info

function Info(props) {
    return (
        <div className={styles.info}>
            <img width={120} height={120} src={"/img/" + props.img} alt={props.title} />
            <h2>{props.title}</h2>
            <p>{props.description}</p>

            <button className="greenButton" onClick={props.hideDrawer   }>
                Вернуться назад
                <img src="/img/arrow.svg" alt="arrow" className="arrowBack"/>
            </button>
        </div>
    )
}