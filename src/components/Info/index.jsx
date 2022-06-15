import styles from "./Info.module.scss"

export default Info

function Info({title, description, img, hideDrawer, height = 120}) {
    return (
        <div className={styles.info}>
            <img height={height}src={"/img/" + img} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>

            { hideDrawer &&
            <button className="greenButton" onClick={hideDrawer}>
                Вернуться назад
                <img src="/img/arrow.svg" alt="arrow" className="arrowBack"/>
            </button>
            }
        </div>
    )
}