import React from 'react'
import { FormButton, Text } from '../../components/GlobalStyles/PageStyles'
import styled from 'styled-components'
import { getAge } from '../../utils/utilFunctions'
import { useNavigate } from 'react-router-dom'
import { Confirmation, Layout } from './CommonStyles'

const BookingConfirmed = (props) => {
    const { user, room, booking } = props
    const navigate = useNavigate()

    return (
        <>
            <Confirmation>
                <img src="https://img.icons8.com/fluency/48/000000/ok.png" alt="/"
                    style={{ marginRight: '10px' }} />
                <Text style={{ margin: '0' }}>Réservation confirmée</Text>
            </Confirmation>
            <Layout style={{ marginTop: '20px' }}>
                <div className="section">
                    <Text>Informations du client</Text>
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
                        Total: <span>{booking.people.adults + booking.people.children}</span>
                    </Text>
                    <Text style={{ marginTop: '20px' }}>Booking Info</Text>
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
                <div className="section">
                    <Text>Info paiement</Text>
                    <Text className="small">
                        Chambre(s) Cout: <span>Rs. {booking.amount}</span>
                    </Text>
                    <Text className="small">
                        Taxe: <span>Rs. {20}</span>
                    </Text>
                    <Text className="small">
                        Cout total: <span>Rs. {booking.amount + 20}</span>
                    </Text>
                    <Text className="small">
                        Statut du paiement: <span>{booking.paid ? 'Paid' : 'Not Paid'}</span>
                    </Text>
                </div>
            </Layout>
            <Layout className="buttons">
                <FormButton onClick={() => navigate(`/bookings`)}
                    style={{ marginLeft: 'auto' }}>
                    Vos réservations
                </FormButton>
            </Layout>
        </>
    )
}

export default BookingConfirmed
