import React from 'react'
import { FormButton, Text } from '../../components/GlobalStyles/PageStyles'
import styled from 'styled-components'
import { getAge } from '../../utils/utilFunctions'
import { useNavigate } from 'react-router-dom'
import { Layout } from './CommonStyles'


const CustomerInfo = (props) => {
    const { user, room, booking } = props
    const navigate = useNavigate()

    return (
        <>
            <Layout>
                <div className="section">
                    <Text>Customer Info</Text>
                    <Text className="small">
                        Nom: <span>{user.name}</span>
                    </Text>
                    <Text className="small">
                        Email: <span>{user.email}</span>
                    </Text>
                    <Text className="small">
                        Age: <span>{getAge(user.dob)}</span>
                    </Text>
                    <Text className="small">
                        Total: <span>{booking.people.adults+booking.people.children} Persons</span>
                    </Text>
                </div>
                <div className="section">
                    <Text>Info réservation</Text>
                    <Text className="small">
                        Hotel: <span>{room.hotel.name}</span>
                    </Text>
                    <Text className="small">
                        Chambre: <span>{room.name}</span>
                    </Text>
                    <Text className="small" style={{ margin: '-10px 0 10px 0' }}>
                        Numéro de chambre(s): 
                        {booking.roomNumbers.map(r =>
                            (<span className="highlight" style={{ margin: '4px 2px' }}>{r}</span>)
                        )}
                    </Text>
                    <Text className="small">
                        Prix (Par chambre): <span>Rs. {room.price}</span>
                    </Text>
                    <Text className="small">
                        Cout total: <span>Rs. {booking.amount}</span>
                    </Text>
                </div>
            </Layout>
            <Layout className="buttons">
                <FormButton onClick={() => navigate(`/payment/${room.hotel.id}/${room.id}/1`, {state: booking})}>
                    Revenir en arrière
                </FormButton>
                <FormButton onClick={() => navigate(`/payment/${room.hotel.id}/${room.id}/2`, {state: booking})}>
                    Confirmez
                </FormButton>
            </Layout>
        </>
    )
}

export default CustomerInfo
