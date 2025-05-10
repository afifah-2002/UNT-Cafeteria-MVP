//AI generated to test FE-BE connection - should be replace with actual code later


import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getHomeData } from '../services/api';

const HomeScreen = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getHomeData();
                setData(result);
            } catch (error) {
                setData('Error fetching data');
            }
        };
        fetchData();
    }, []);

    return (
        <View>
            <Text>{data}</Text>
        </View>
    );
};

export default HomeScreen;