import { Image, StyleSheet, Text, View } from 'react-native'

export default function Miembro({ nombre, puesto, detalle, imagenUri }) {
  if (!nombre) {
    return null
  }

  return (
    <View style={styles.card}>
      {imagenUri ? (
        <Image source={{ uri: imagenUri }} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarPlaceholder} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.nombreText}>{nombre}</Text>
        <Text style={styles.puestoText}>{puesto}</Text>
        {detalle ? <Text style={styles.detalleText}>{detalle}</Text> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#2b2d42',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center'
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8d99ae',
    marginRight: 12
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#8d99ae'
  },
  infoContainer: {
    flex: 1
  },
  nombreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  puestoText: {
    fontSize: 14,
    color: '#8d99ae'
  },
  detalleText: {
    fontSize: 12,
    color: '#e07a5f',
    marginTop: 2
  }
})