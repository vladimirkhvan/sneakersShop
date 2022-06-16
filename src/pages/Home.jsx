export default Home

function Home({cards, searchValue, setSearchValue}) {

    return (
        <main>

            <div className="contentHeader">
                <h2>Все кроссовки</h2>

                <span>

                    <img src="/img/search.svg" alt="search" />
                    <input type="text" name="search" placeholder="Поиск..." value={searchValue} onChange={e => setSearchValue(e.target.value)} />

                </span>
            </div>


            <div className="contentWrapper">

                {cards}

            </div>

        </main>
    )
}