import { StyleSheet, Text, View, Image, ImageBackground, SectionList } from 'react-native';
import GameCard from './components/GameCard';
import dados from './assets/dados.json';

export default function App() {

  const jogos = dados.jogos;

  const agruparPorData = (jogos) => {
    return jogos.reduce((acc, jogo) => {

      const data = jogo.data_brasilia; // data do jogo
      if (!acc[data]) {
        acc[data] = []; // se a data ainda não existe no acumulador, cria um array para ela
      }

      acc[data].push(jogo); // adiciona o jogo ao array da data correspondente

      return acc; // retorna o acumulador para a próxima iteração
    }, {}); // reduce: reduz um array a um único valor, acumulando os resultados em um objeto
  };

  const jogosAgrupados = agruparPorData(jogos); // agrupa os jogos por data

  const jogosTratados = Object.keys(jogosAgrupados).map(data => {
    return {
      title: data,
      data: jogosAgrupados[data]
    };
  }); // transforma o objeto de jogos agrupados em um array de objetos, onde cada objeto tem uma propriedade "title" 
      // com a data e uma propriedade "dados" com os jogos daquela data 

      console.log(jogosTratados); // exibe o array de jogos tratados no console
  return (
    <ImageBackground style={styles.container}
      source={require('./assets/bg-overlay.png')}>
      
      {/* a logo */}
      <Image style={styles.logo}
        source={require('./assets/unicopa.png')}
      />

      <Text style={styles.title}>CALENDÁRIO</Text>

      <SectionList
        sections={jogosTratados}
        keyExtractor={(item, index) => item + index}
        renderItem={() => null}
        renderSectionHeader={ ({section}) => (
          <View style={styles.card}>
            <Text style={styles.data}>{section.title}</Text>
            {
              section.data.map(jogo => (
                <GameCard key={jogo.id} game={jogo} />
              ))
            }
          </View>
        )
      }
      />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#040b13',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 50,
    resizeMode: 'contain'
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#0c1b2a',
    width: 320,
    borderRadius: 12,
    padding: 15,
  },
  data: {
    color: '#f2cc2f',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
 
});