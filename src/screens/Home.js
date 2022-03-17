import React, { useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, RefreshControl, SafeAreaView, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { getRecipes } from '../redux/action';

const { width, height} = Dimensions.get('screen');

const Home = ({ navigation}) => {

    const [ isLoading, setIsLoading ] = useState(false);

    const { recipes, favorite } = useSelector(state => state.recipeReducer);

    const dispatch = useDispatch();

    const fetchRecipes = () => dispatch(getRecipes());


    useEffect(() => {
        setIsLoading(true);
        fetchRecipes();
        setIsLoading(false);
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, marginTop: 10, marginBottom: 50 }}>
            <FlatList
                data={recipes}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Detail', {
                            screen: 'nestedDetail',
                            params: {
                                key: item.key,
                                title: item.title
                            }
                        })}
                    >
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 2, marginBottom: 10}}>
                            <View style={{ width: width / 3, height: height / 8, marginRight: 5, padding: 0 }}>
                                <Image
                                    source={{ uri: item.thumb }}
                                    resizeMode='cover'
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                            <View style={{ width: width / 1.6 }}>
                                <Text style={{ fontSize: 16, color: 'black', textAlign: 'justify' }}>{item.title}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => {
                    if (isLoading) {
                        return <ActivityIndicator animating size="large" color="red" style={{ marginVertical: height / 3 }} />
                    }
                    return <ActivityIndicator animating size="large" color="red" style={{ marginVertical: height / 3 }} />
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.key}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {
        marginHorizontal: 10,
        marginVertical: 8,
    },
    image: {
        height: '100%',
        width: width / 4,
        marginRight: 4
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 5,
    },
    text: {
        fontSize: 16,
        color: 'black',
        textAlign: 'justify'
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Home;