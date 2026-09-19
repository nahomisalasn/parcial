import { useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Miembro from '../components/Miembro'

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('Pantalla1')
  const [clanSeleccionado, setClanSeleccionado] = useState('Los Mexicanos')
  const [enLlamada, setEnLlamada] = useState(false)
  const [interacciones, setInteracciones] = useState(0)

  const contarInteraccion = () => {
    setInteracciones((prev) => prev + 1)
  }

  const irAPantalla = (nombrePantalla: string) => {
    setPantallaActual(nombrePantalla)
    contarInteraccion()
  }

  const entrarAClan = (nombreClan: string) => {
    setClanSeleccionado(nombreClan)
    setPantallaActual('Pantalla2')
    contarInteraccion()
  }

  // --- PANTALLA 1: Perfil, Juegos y Clanes ---
  if (pantallaActual === 'Pantalla1') {
    const imgClash = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVTlJ_nYdgyZYS-7veQzRmDjvNPP5CdK4XWWBA0suYHQ&s=10'
    const imgCod = 'https://play-lh.googleusercontent.com/cKXlbU72_2wSXdjcD_zPWED3EVaaOQVqqHgiA9JoRQMprYen49arNUMTngcRc9UWLnv-ANT9gyQBDQpvAn61lg'
    const imgLol = 'https://i.blogs.es/ff4f41/elqk-v1wmauw09m/1366_2000.jpg'

    const imgMexicanos = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThuZcVkIeg04XPYqCvpp6TKnbsBv91n_vSQlZtfgda0vH4o81_Qb3NZFU&s=10'
    const imgTridentes = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFmKnV0QQo_uIbaNBOKvOV96MfgtD0u54VOhhXGGQBfg&s'
    const imgLostGame = 'https://i.pinimg.com/236x/40/9d/66/409d66afbf5aff0464d61b43b062d7ac.jpg'


    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.screenContent}>
          <Text style={styles.title}>Perfil de Usuario</Text>
          <Text style={styles.subtitle}>Informacion basica del usuario</Text>

          <Text style={styles.sectionTitle}>Juegos</Text>
          <View style={styles.juegosContainer}>
            <TouchableOpacity style={styles.gameCardCentered} onPress={contarInteraccion}>
              <Image source={{ uri: imgClash }} style={styles.gameImage} />
              <Text style={styles.gameTitleCentered}>Clash Royale</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gameCardCentered} onPress={contarInteraccion}>
              <Image source={{ uri: imgCod }} style={styles.gameImage} />
              <Text style={styles.gameTitleCentered}>CoD Mobile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gameCardCentered} onPress={contarInteraccion}>
              <Image source={{ uri: imgLol }} style={styles.gameImage} />
              <Text style={styles.gameTitleCentered}>LoL</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Clanes (Toca uno para entrar)</Text>
          
          <TouchableOpacity onPress={() => entrarAClan('Los Mexicanos')}>
            <Miembro 
              nombre="Los Mexicanos" 
              puesto="Clan Oficial #1" 
              detalle="15/20 Miembros - Toca para entrar" 
              imagenUri={imgMexicanos} 
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => entrarAClan('Tridentes')}>
            <Miembro 
              nombre="Tridentes" 
              puesto="Clan Competitivo" 
              detalle="18/20 Miembros - Toca para entrar" 
              imagenUri={imgTridentes} 
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => entrarAClan('Lost Game')}>
            <Miembro 
              nombre="Lost Game" 
              puesto="Clan Casual" 
              detalle="10/20 Miembros - Toca para entrar" 
              imagenUri={imgLostGame} 
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  // --- PANTALLA 2: Vista del Clan Seleccionado ---
  if (pantallaActual === 'Pantalla2') {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topBarFixed}>
          <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => irAPantalla('Pantalla1')}
          >
            <Text style={styles.btnText}>← Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.assignBtn} 
            onPress={() => irAPantalla('Pantalla3')}
          >
            <Text style={styles.btnText}>Ver Asignaciones →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text style={styles.title}>Clan: {clanSeleccionado}</Text>
          
          <TouchableOpacity
            style={[styles.btnLlamada, enLlamada ? styles.btnFocus : styles.btnBlur]}
            onPress={() => {
              setEnLlamada(!enLlamada)
              contarInteraccion()
            }}
          >
            <Text style={styles.btnText}>
              {enLlamada ? 'Estado: Focus (En Llamada del Clan)' : 'Estado: Blur (Iniciar Llamada)'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Miembros del Clan</Text>
          <Miembro nombre="Miembro 1" puesto="Tanque" detalle="Tareas completas" />
          <Miembro nombre="Miembro 2" puesto="Soporte" detalle="En linea" />
          <Miembro nombre="Miembro 3" puesto="DPS" detalle="En partida" />
        </ScrollView>

        <View style={styles.fixedBottom}>
          <TouchableOpacity style={styles.bottomBtn} onPress={contarInteraccion}>
            <Text style={styles.btnText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomBtn, styles.btnCall]} onPress={contarInteraccion}>
            <Text style={styles.btnText}>Voz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // --- PANTALLA 3: Asignaciones y Misiones ---
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topBarFixed}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => irAPantalla('Pantalla2')}
        >
          <Text style={styles.btnText}>← Volver al Clan</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.homeBtnNav} 
          onPress={() => irAPantalla('Pantalla1')}
        >
          <Text style={styles.btnText}>Inicio 🏠</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.screenContent}>
        <Text style={styles.title}>Asignaciones</Text>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Imagen del Juego</Text>
        </View>

        <TouchableOpacity style={styles.cardMision} onPress={contarInteraccion}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.misionText}>Mision 1: Derrotar Boss</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardMision} onPress={contarInteraccion}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.misionText}>Mision 2: Recolectar Recursos</Text>
        </TouchableOpacity>

        <Text style={styles.counterText}>
          Total interacciones: {interacciones}
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#1e1e24',
    paddingTop: 40
  },
  screenContent: { 
    flex: 1, 
    padding: 16 
  },
  topBarFixed: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2b2d42',
    marginBottom: 10
  },
  backBtn: { 
    padding: 10, 
    backgroundColor: '#3d405b', 
    borderRadius: 6
  },
  assignBtn: { 
    padding: 10, 
    backgroundColor: '#e07a5f', 
    borderRadius: 6 
  },
  homeBtnNav: {
    padding: 10,
    backgroundColor: '#8d99ae',
    borderRadius: 6
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 4 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#8d99ae', 
    marginBottom: 12 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginTop: 16, 
    marginBottom: 12 
  },
  juegosContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 10 
  },
  gameCardCentered: { 
    flex: 1, 
    backgroundColor: '#3d405b', 
    borderRadius: 8, 
    padding: 10, 
    marginHorizontal: 4, 
    alignItems: 'center' 
  },
  gameImage: { 
    width: 50, 
    height: 50, 
    borderRadius: 8, 
    backgroundColor: '#8d99ae', 
    marginBottom: 6 
  },
  gameTitleCentered: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 12, 
    textAlign: 'center' 
  },
  btnLlamada: { 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginVertical: 12 
  },
  btnBlur: { 
    backgroundColor: '#3d405b' 
  },
  btnFocus: { 
    backgroundColor: '#e07a5f' 
  },
  btnText: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 12 
  },
  fixedBottom: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16,
    borderTopWidth: 1, 
    borderTopColor: '#3d405b',
    backgroundColor: '#1e1e24'
  },
  bottomBtn: { 
    flex: 1, 
    backgroundColor: '#8d99ae', 
    padding: 12, 
    borderRadius: 8, 
    marginHorizontal: 4, 
    alignItems: 'center' 
  },
  btnCall: { 
    backgroundColor: '#e07a5f' 
  },
  banner: { 
    height: 110, 
    backgroundColor: '#3d405b', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  bannerText: { 
    color: '#ffffff', 
    fontWeight: 'bold' 
  },
  cardMision: { 
    flexDirection: 'row', 
    backgroundColor: '#2b2d42', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 10, 
    alignItems: 'center' 
  },
  iconPlaceholder: { 
    width: 32, 
    height: 32, 
    borderRadius: 6, 
    backgroundColor: '#8d99ae', 
    marginRight: 12 
  },
  misionText: { 
    color: '#ffffff', 
    fontWeight: 'bold' 
  },
  counterText: { 
    color: '#8d99ae', 
    marginTop: 16, 
    textAlign: 'center', 
    fontSize: 14 
  }
})