import React, { Component } from 'react';
import {View, Link } from 'react-native';

const BackButton = (props) => {
    return (
        <View className="d-flex p-2">
            <Link to={ "/app" }>
                <Text className="btn btn-dark " type="button">Voltar</Text>
            </Link>
        </View>
    );
}   
export default BackButton;