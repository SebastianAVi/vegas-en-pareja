// ============================================================
//  DATOS DEL VIAJE — edita este archivo para cambiar contenido
// ============================================================

// Lugares de la lista de Google Maps "VEGAS🎰" (29 sitios).
// cat: tienda | atraccion | comida | hotel | ruta
window.LUGARES = [
  { n: "Lids", cat: "tienda", tipo: "Tienda de ropa", lat: 36.102393, lng: -115.1725289, dir: "3791 S Las Vegas Blvd Ste 1400, Las Vegas, NV 89109" },
  { n: "Las Vegas South Premium Outlets", cat: "tienda", tipo: "Outlet", lat: 36.0539333, lng: -115.1689283, dir: "7400 Las Vegas Blvd S, Las Vegas, NV 89123" },
  { n: "Las Vegas North Premium Outlets", cat: "tienda", tipo: "Outlet", lat: 36.1636508, lng: -115.1577492, dir: "875 S Grand Central Pkwy, Las Vegas, NV 89106" },
  { n: "Las Vegas Premium Outlets (estacionamiento)", cat: "tienda", tipo: "Estacionamiento del outlet", lat: 36.1658791, lng: -115.1574266, dir: "886 LV Premium Outlet Dr, Las Vegas, NV 89106" },
  { n: "Target", cat: "tienda", tipo: "Grandes almacenes", lat: 36.1047678, lng: -115.1724785, dir: "3767 Las Vegas Blvd S Ste 100, Las Vegas, NV 89109" },
  { n: "Walmart Supercenter", cat: "tienda", tipo: "Supermercado", lat: 36.098402, lng: -115.1077435, dir: "3075 E Tropicana Ave, Las Vegas, NV 89121" },
  { n: "Marshalls (Strip)", cat: "tienda", tipo: "Grandes almacenes", lat: 36.1034607, lng: -115.1724803, dir: "3785 S Las Vegas Blvd, Las Vegas, NV 89109" },
  { n: "Marshalls (Maryland Pkwy)", cat: "tienda", tipo: "Grandes almacenes", lat: 36.1213531, lng: -115.1355213, dir: "3740 S Maryland Pkwy, Las Vegas, NV 89119" },
  { n: "T.J. Maxx", cat: "tienda", tipo: "Grandes almacenes", lat: 36.0666245, lng: -115.175344, dir: "6677 Las Vegas Blvd S, Las Vegas, NV 89119" },
  { n: "Ross Dress for Less (3771 Strip)", cat: "tienda", tipo: "Ropa", lat: 36.1042632, lng: -115.172375, dir: "3771 Las Vegas Blvd S, Las Vegas, NV 89109" },
  { n: "Ross Dress for Less (3716 Strip)", cat: "tienda", tipo: "Ropa", lat: 36.1087245, lng: -115.1737178, dir: "3716 S Las Vegas Blvd, Las Vegas, NV 89109" },
  { n: "Ross Dress for Less (3001 Strip)", cat: "tienda", tipo: "Ropa", lat: 36.1332013, lng: -115.1633993, dir: "3001 Las Vegas Blvd S, Las Vegas, NV 89109" },
  { n: "Ross Dress for Less (Maryland Pkwy)", cat: "tienda", tipo: "Ropa", lat: 36.1187133, lng: -115.135765, dir: "3880 S Maryland Pkwy, Las Vegas, NV 89119" },
  { n: "Coca-Cola Store Las Vegas", cat: "tienda", tipo: "Tienda temática", lat: 36.1036811, lng: -115.1725008, dir: "3785 Las Vegas Blvd S, Las Vegas, NV 89109" },
  { n: "Bonanza Gift Store", cat: "tienda", tipo: "Souvenirs", lat: 36.1444439, lng: -115.1573217, dir: "2400 Las Vegas Blvd S, Las Vegas, NV 89104" },
  { n: "Gold & Silver Pawn Shop", cat: "tienda", tipo: "Casa de empeños (El Precio de la Historia)", lat: 36.1616842, lng: -115.1453919, dir: "713 S Las Vegas Blvd, Las Vegas, NV 89101" },

  { n: "Sphere", cat: "atraccion", tipo: "Atracción", lat: 36.121217, lng: -115.1620404, dir: "255 Sands Ave, Las Vegas, NV 89169" },
  { n: "Fuentes del Bellagio", cat: "atraccion", tipo: "Show gratis", lat: 36.1127187, lng: -115.1739109, dir: "3600 S Las Vegas Blvd, Las Vegas, NV 89109" },
  { n: "Fremont Street Experience", cat: "atraccion", tipo: "Calle peatonal / show de luces", lat: 36.1707275, lng: -115.1438229, dir: "Fremont St, Las Vegas, NV 89101" },
  { n: "Welcome to Fabulous Las Vegas", cat: "atraccion", tipo: "Letrero icónico (foto obligada 📸)", lat: 36.0820727, lng: -115.172779, dir: "5100 Las Vegas Blvd S, Las Vegas, NV 89119" },

  { n: "Chilangos Tacos", cat: "comida", tipo: "Restaurante mexicano", lat: 36.1140799, lng: -115.1719404, dir: "3631 S Las Vegas Blvd Ste 310, Las Vegas, NV 89109" },

  { n: "Las Vegas Serene Hotel", cat: "hotel", tipo: "Nuestro hotel 🏨", lat: 36.1077604, lng: -115.1540375, dir: "455 E Harmon Ave, Las Vegas, NV 89169" },

  { n: "Curva de la Herradura (Horseshoe Bend)", cat: "ruta", tipo: "Mirador", lat: 36.8790612, lng: -111.5103627, dir: "Page, AZ 86040" },
  { n: "Cañón del Antílope", cat: "ruta", tipo: "Cañón", lat: 36.8619103, lng: -111.3743302, dir: "Page, AZ 86040" },
  { n: "Canyon X (Antelope Canyon)", cat: "ruta", tipo: "Tour de cañón", lat: 36.7990187, lng: -111.3372658, dir: "Page, AZ 86040" },
  { n: "City of Page Arizona sign", cat: "ruta", tipo: "Letrero", lat: 36.93109, lng: -111.4732946, dir: "Page, AZ 86040" },
  { n: "Welcome to Arizona Sign (US-89)", cat: "ruta", tipo: "Letrero", lat: 37.000793, lng: -111.5722007, dir: "Frontera Utah / Arizona, US-89" },
  { n: "Welcome to Arizona Sign (I-15)", cat: "ruta", tipo: "Letrero", lat: 36.9981164, lng: -113.6247193, dir: "Littlefield, AZ 86432" },
  { n: "Welcome to Utah sign", cat: "ruta", tipo: "Letrero", lat: 36.9991189, lng: -113.621501, dir: "I-15, St. George, UT 84790" }
];

window.CATEGORIAS = {
  tienda:    { nombre: "Tiendas",      icono: "🛍️", color: "#FF3D7F" },
  atraccion: { nombre: "Atracciones",  icono: "🎰", color: "#FFC94A" },
  comida:    { nombre: "Comida",       icono: "🌮", color: "#FF8A3D" },
  hotel:     { nombre: "Hotel",        icono: "🏨", color: "#4AD9FF" },
  ruta:      { nombre: "Road trip AZ / UT", icono: "🏜️", color: "#B57BFF" }
};

// Eventos / panoramas. "fecha" en formato AAAA-MM-DD (deja "" si aún no se sabe).
// También se pueden agregar eventos desde la app (se guardan en el teléfono).
window.EVENTOS = [
  { titulo: "Show de las Fuentes del Bellagio", fecha: "", hora: "Tarde: cada 30 min · Noche (20:00–24:00): cada 15 min", lugar: "Fuentes del Bellagio", nota: "Gratis. Los horarios pueden cambiar por viento o eventos." },
  { titulo: "Viva Vision en Fremont Street", fecha: "", hora: "Cada hora desde que oscurece", lugar: "Fremont Street Experience", nota: "Show de luces en el techo de la calle. Gratis." },
  { titulo: "Experiencia en la Sphere", fecha: "", hora: "", lugar: "Sphere", nota: "Revisar cartelera y comprar entradas con anticipación." },
  { titulo: "Foto en el letrero de Las Vegas", fecha: "", hora: "Ideal temprano para evitar filas", lugar: "Welcome to Fabulous Las Vegas", nota: "" },
  { titulo: "Día de outlets", fecha: "", hora: "", lugar: "Las Vegas North Premium Outlets", nota: "Ver cupones en el centro de información del outlet." },
  { titulo: "Road trip: Horseshoe Bend + Antelope Canyon", fecha: "", hora: "Salir de madrugada (~4,5 h de viaje)", lugar: "Curva de la Herradura (Horseshoe Bend)", nota: "Arizona tiene otra hora que Nevada en ciertas épocas. El tour del cañón se reserva antes." }
];

// Contactos de emergencia. Los teléfonos de consulado/hospital conviene verificarlos antes de viajar.
window.CONTACTOS = [
  { nombre: "Emergencias (policía, bomberos, ambulancia)", tel: "911", icono: "🚨", nota: "Gratis desde cualquier teléfono en EE.UU." },
  { nombre: "Policía Metro de Las Vegas (no urgente)", tel: "+17028283111", icono: "👮", nota: "Para reportar robos o pérdidas" },
  { nombre: "Centro de Toxicología (Poison Control)", tel: "+18002221222", icono: "☠️", nota: "24 horas" },
  { nombre: "Consulado General de Chile en Los Ángeles", tel: "+13239333697", icono: "🇨🇱", nota: "Jurisdicción de Nevada. Verificar número antes del viaje." },
  { nombre: "Emergencias consulares Chile (Santiago)", tel: "+56222827000", icono: "🇨🇱", nota: "Ministerio de RR.EE. — verificar antes del viaje" },
  { nombre: "Sunrise Hospital (urgencias)", tel: "+17027318000", icono: "🏥", nota: "3186 S Maryland Pkwy — cercano al Strip", lat: 36.1336, lng: -115.1364 },
  { nombre: "Las Vegas Serene Hotel", tel: "", icono: "🏨", nota: "455 E Harmon Ave — agrega el teléfono de la reserva", lat: 36.1077604, lng: -115.1540375 }
];

// Galería: pon los archivos en www/media/ y agrégalos aquí.
// tipo: "foto" | "video"
window.GALERIA = [
  // { tipo: "foto",  src: "media/ejemplo.jpg", titulo: "Llegando a Vegas", fecha: "2026-12-01" },
  // { tipo: "video", src: "media/ejemplo.mp4", titulo: "Fuentes del Bellagio", poster: "media/ejemplo.jpg" }
];
