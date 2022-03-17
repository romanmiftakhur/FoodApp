import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Card, IconButton, Colors } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipe, addToFavorite, removeFromFavorite } from '../redux/action';

const { width, height } = Dimensions.get('window');

const Detail = ({ navigation, route}) => {
    const { key, title} = route.params;
    const [isLoading, setIsLoading] = useState(true);

    const { details, favorite} = useSelector(state => state.recipeReducer);

    const dispatch = useDispatch();

    const fetchRecipes = () => dispatch(getRecipe(key));

    useEffect(() => {
        setIsLoading(true);
        fetchRecipes();
        setIsLoading(false);
    }, [])

    const addToFavoriteList = (recipe) => dispatch(addToFavorite(recipe));
    const removeFromFavoriteList = (recipe) => dispatch(removeFromFavorite(recipe));

    const handleAddFavorite = (recipe) => {
        addToFavoriteList(recipe);
    };

    const handleRemoveFavorite = (recipe) => {
        removeFromFavoriteList(recipe);
    };

    const ifExist = (recipe) => {
        if(favorite.filter( item => item.title === recipe.title).length > 0) {
            return true;
        }

        return false;
    }



    return (
        <SafeAreaView style={{ flex: 1, marginBottom: 50 }}>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={details}
                renderItem={({ item, index }) => (
                    <View style={styles.container} key={item.key}>
                        <Card style={styles.cardContent}>
                            <Image
                                source={{ uri: item.thumb }}
                                resizeMode='cover'
                                style={styles.img}
                            />
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                            <View style={styles.author}>
                                <Text style={styles.text}>By : {item.author.user}</Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress = {() => {
                                        ifExist(item) ? handleRemoveFavorite(item) : handleAddFavorite(item)
                                    }}
                                >
                                <MaterialIcons
                                    color = { ifExist(item) ? 'black' : 'green'}
                                    name  = { ifExist(item) ? 'favorite-outline' : 'favorite'}
                                    size  = { 33}
                                />

                                </TouchableOpacity>
                            </View>
                            <View style={styles.information}>
                                <Card style={styles.cardInformation}>
                                    <MaterialIcons name='timer' color='black' size={30} style={{ justifyContent: 'center' }} />
                                    <Text style={styles.text}>{item.times}</Text>
                                </Card>
                                <Card style={styles.cardInformation}>
                                    <MaterialIcons name='fastfood' color='black' size={30} style={{ justifyContent: 'center' }} />
                                    <Text style={styles.text}>{item.servings}</Text>
                                </Card>
                                <Card style={styles.cardInformation}>
                                    <MaterialIcons name='timeline' color='black' size={30} style={{ justifyContent: 'center' }} />
                                    <Text style={styles.text}>{item.dificulty}</Text>
                                </Card>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.title}>
                                    Bahan
                                </Text>
                                {
                                    item.ingredient.map((item, index) => <Text style={styles.text} key={index}>{item} </Text>)
                                }
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.title}>
                                    Langkah - Langkah
                                </Text>
                                {
                                    item.step.map((item, index) => <Text style={styles.text} key={index}>{item} </Text>)
                                }
                            </View>
                        </Card>
                    </View>
                )}
                ListEmptyComponent={() => {
                    if (isLoading) {
                        return <ActivityIndicator animating size="large" color="red" style={{ marginVertical: height / 2.5 }} />
                    }
                    return <ActivityIndicator animating size="large" color="red" style={{ marginVertical: height / 2 }} />
                }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContent: {
        marginVertical: 15,
        padding: 5,
        marginHorizontal: 5,
        elevation: 10
    },
    img: {
        height: height / 4
    },
    title: {
        fontSize: 20,
        color: 'black'
    },
    author: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: 'black'
    },
    information: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 1
    },
    cardInformation: {
        marginHorizontal: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    }
})

export default Detail;