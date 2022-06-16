import Info from "../components/Info";

export default Favorite

function Favorite({cards = [], searchValue, setSearchValue}){

    let cardElements = cards.length ? 
    <div className="contentWrapper">

        {cards}

    </div>
    : 
    (
        <div className="emptyPage">
            <Info
                title= "Закладок нет :("
                description={`Вы ничего не добавляли в закладки`}
                img= "noFavorite.png"
                height={70}
            />
        </div>
    );

    return (
        <main>

            <div className="contentHeader">
                <h2>Мои закладки</h2>

                <span>

                    <img src="/img/search.svg" alt="search" />
                    <input type="text" name="search" placeholder="Поиск..." value={searchValue} onChange={e => setSearchValue(e.target.value)} />

                </span>
            </div>

            {cardElements}

        </main>
    )
}