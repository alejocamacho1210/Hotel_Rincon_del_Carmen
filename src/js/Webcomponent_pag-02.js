class ReservationPage extends HTMLElement{

connectedCallback(){

this.innerHTML=`

<main class="reservation-page">

<section class="reservation-hero">

<h1 class="reservation-title">
Reserva tu habitación ideal
</h1>

<p class="reservation-subtitle">
Descubre espacios cómodos y modernos para disfrutar tu estadía.
</p>

</section>

<section class="filters-section">

<div class="filter-box">
<label>Entrada</label>
<input type="date" id="check-in">
</div>

<div class="filter-box">
<label>Salida</label>
<input type="date" id="check-out">
</div>

<div class="filter-box">
<label>Personas</label>
<input type="number" id="cantPersonas" placeholder="0">
</div>

</section>

<section class="rooms-section">

${this.room("../images/estandar_king.jpeg","Estandar King","Habitación amplia con cama king y ambiente moderno.","$180.000")}
${this.room("../images/estandar_double.jpeg","Estandar Double","Perfecta para parejas o amigos con dos camas cómodas.","$210.000")}
${this.room("../images/ejecutiva_king.jpeg","Ejecutiva King","Ideal para viajes de negocios y descanso ejecutivo.","$290.000")}
${this.room("../images/habitacion_premium.jpeg","Habitacion premium","Espacio elegante con acabados premium y mayor confort.","$350.000")}
${this.room("../images/apart_hotel.jpeg","Apart hotel","Habitación tipo apartamento para largas estadías.","$400.000")}
${this.room("../images/suite_junior.jpeg","Junior suite","Suite cómoda y moderna con ambiente exclusivo.","$450.000")}
${this.room("../images/suite_familiar.jpeg","Suite familiar","Espacio amplio pensado para familias y grupos.","$500.000")}
${this.room("../images/suite_presidencial.jpeg","Suite presidencial","La habitación más lujosa del hotel con servicios VIP.","$650.000")}
${this.room("../images/habitacion_accesible.jpeg","Habitaciones accesibles","Diseñada para brindar comodidad y fácil acceso.","$230.000")}

</section>

</main>

`
}

room(img,name,description,price){

return`

<article class="room-card">

<img src="${img}">

<div class="room-content">

<h2>${name}</h2>

<p class="room-description">
${description}
</p>

<div class="room-services">
<span>📶 Wifi</span>
<span>🛏️ Comfort</span>
<span>📺 TV</span>
</div>

<div class="room-footer">
<strong>${price} / noche</strong>
<button>Reservar</button>
</div>

</div>

</article>

`
}
}

customElements.define("reservation-page",ReservationPage)