import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {

  const dispatch = useDispatch();

  return (
    //STYLE FOR THE HOME SCREEN IS HERE
    // MENU ON THE HOME SCREEN && UBER IMAGE ON TOP CORNER LEFT 

    <SafeAreaView style = { tw `bg-white h-full`}>
      <View style={ tw `p-5`}>
        
        <Text style = {tw `text-5xl font-bold p-5`}>Serra App</Text>

        {/* <Image
         style = {{width: 100, height: 100, resizeMode: "contain"}}
         source={{uri: "https://links.papareact.com/gzs"}}
        /> */}
        
        <GooglePlacesAutocomplete
        
            placeholder="De onde vai sair? Digite aqui"
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description
              }));
              dispatch(setDestination(null))
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'pt-br'
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}

        />

        <NavOptions/>

        <NavFavourites />

      </View>
    </SafeAreaView>
  )
}


export default HomeScreen

const styles = StyleSheet.create({})