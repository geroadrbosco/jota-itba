import "../styles/home.css"

export const Home = () => {

  return (
    <div className='home-container'>
      <div className="content-wrapper">
        <h1 className="main-title">Hermanos Jota</h1>
        
        <div className="description-box">
          <p>Bienvenidos a la página de Hermanos Jota, donde la tradición y la calidad se unen para ofrecerte los mejores productos. 
          Facilitamos el proceso de encontrar productos de calidad de manera rápida y segura.</p>
        </div>
        
        <div className="creators-container">
          <div className="creator-box">
            <h3>Fernando Romero</h3>
            <p>Desarrollador</p>
          </div>
          <div className="creator-box">
            <h3>Kevin Serrano</h3>
            <p>Desarrollador Full Stack</p>
          </div>
          <div className="creator-box">
            <h3>Geronimo Bosco</h3>
            <p>Desarrollador</p>
          </div>
          <div className="creator-box">
            <h3>Ivanna Valle</h3>
            <p>Desarrollador</p>
          </div>
          <div className="creator-box">
            <h3>Roger Zegarra</h3>
            <p>Desarrollador</p>
          </div>
        </div>
      </div>        
    </div>
  )
}