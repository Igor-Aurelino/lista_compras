import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-web';
import supabase from "./conexao";

export default function App() {
  const [produtoDigitado, setProdutoDigitado] = useState("");
  const [valorDigitado, setValorDigitado] = useState("");
  const [qtdDigitado, setQtdDigitado] = useState("");
  const [dados, setDados] = useState([]);

//Função para consultar os veículos
  const consultarCompras = async () =>{
   
      const {data, error} = await supabase.from ("tb_lista_compras")
      .select("*")

      if(error){ alert("Falha ao consultar!"+error.message)
      }else{
        setDados(data)
      }
    }
//Função para cadastrar compras
const cadastrarCompras = async () =>{
   if(  produtoDigitado == "" ||
        valorDigitado == "" ||
        qtdDigitado== ""){
      alert("Preencha todos os campos!")
    }else{
    const {error} = await supabase.from ("tb_lista_compras")
      .insert({coluna_produto: produtoDigitado,
              coluna_valor: valorDigitado,
              coluna_quantidade: qtdDigitado})
        if(error){
          alert("Falha ao Cadastrar1"+error.message)
        }else{
          alert("Cadastrado com Sucesso!")
          consultarCompras()
        }
    }
}
useEffect(()=>{
  consultarCompras()
},[])

  return (
    <View style={estilos.container}>
      <Text style={{fontSize: 20}}>Cadrastro de Compras</Text>
      <TextInput
        onChangeText={(texto) => setProdutoDigitado (texto)}
        placeholder='Digite o produto'
        style={estilos.caixaTexto}

      />
      <TextInput
       onChangeText={(texto) => setValorDigitado (texto)}
        placeholder='Digite o valor'
        style={estilos.caixaTexto}

      />
      <TextInput
       onChangeText={(texto) => setQtdDigitado (texto)}
        placeholder='Digite a quantidade'
        style={estilos.caixaTexto}

      />
      <Button
        title='Cadastrar'
        onPress={()=>{cadastrarCompras()}}
      />
      <ScrollView>
        {dados.map((item)=>(
          <View style={estilos.cxCompras}>
                  <Text>Produto: {item.coluna_produto}</Text>
                  <Text>Valor: R$ {item.coluna_valor}</Text>
                  <Text>Quantidade: {item.coluna_quantidade}</Text>
        </View>
          )
        )}

      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
const estilos = StyleSheet.create({
  cxCompras:{
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300,
    padding: 10,
    margin: 10
  },
  caixaTexto:{
    borderWidth: 1,
    borderColor: "#c5c5c56",
    padding: 4,
    borderRadius: 4,
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});