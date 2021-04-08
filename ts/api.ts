const lista = document.getElementById('lista')

const cont = document.getElementById('contenedor')
const exchanges = document.getElementById('exchanges')


const coinGecko = async () =>{

    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=mxn&per_page=250&page=1&sparkline=false&price_change_percentage=24h')
    const data = await res.json()

    //const prices = getIds(data)

    //console.log(Object.keys(data))
    const result = data.map((coin)=>generardiv(coin)).join(' ')
    cont.innerHTML = ''
    cont.innerHTML = result
}
const getExchanges = async () =>{
    const res = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=250&page=1')
    const data = await res.json()

    const result = data.map((exchange)=>generarExchanges(exchange)).join(' ')

    cont.innerHTML = ''
    cont.innerHTML = result
}
const generarExchanges =({name,year_established,url,image,trust_score}) =>{
    return `
    <section>
    <h1>${name}</h1>
    <img src=${image}/>
    <h3>Desde: ${year_established}</h3>
    <h3>Sitio: <a href='${url}'>${name}</a></h3>
    <h3>Puntuacion: ${trust_score}</h3>
    </section>
    `
}

const generardiv = ({symbol,name,image,current_price,price_change_percentage_24h_in_currency})=>{
    return `
    <section>
    <h1>${name}</h1>
    <img src=${image}/>
    <h3>Simbolo: ${symbol}</h3>
    
    <h3>Precio: $${current_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h3>
    <h3>Cambio desde ayer: ${price_change_percentage_24h_in_currency.toFixed(2)}%</h3>
    </section>
    `
}

lista.addEventListener('click',(event) =>{
    event.preventDefault()
    coinGecko()
})
exchanges.addEventListener('click',(event) =>{
    event.preventDefault()
    getExchanges()
})

lista.click()