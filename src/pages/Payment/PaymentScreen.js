import React, { useState } from 'react'
import { FormButton, Text } from '../../components/GlobalStyles/PageStyles'
import { getAge } from '../../utils/utilFunctions'
import { useNavigate } from 'react-router-dom'
import { Layout } from './CommonStyles'
import { useMutation } from '@apollo/client'
import { ADD_BOOKING } from '../../graphql/mutations/bookingMutation'
import { toast } from 'react-toastify'
import Loader from "../../components/Loaders/Loader"
import StripeCheckout from 'react-stripe-checkout';
import { MAKE_PAYMENT } from '../../graphql/mutations/paymentMutation'

const PaymentScreen = (props) => {
    const { user, room, booking, bookingExists } = props
    const navigate = useNavigate()
    const [addBooking] = useMutation(ADD_BOOKING)
    const [payAmount] = useMutation(MAKE_PAYMENT)

    const [loading, setLoading] = useState(false)
    
    const handleBook = () => {
        setLoading(true)
        if (bookingExists) {
            navigate(`/bookings`)
            return
        }
        addBooking({
            variables: {
                from: booking.from,
                to: booking.to,
                roomNumbers: booking.roomNumbers,
                bookedBy: booking.bookedBy,
                paid: booking.paid,
                amount: booking.amount + 90,
                people: booking.people,
                room: booking.room,
                hotel: booking.hotel
            }
        }).then(res => {
            let newBooking = booking
            newBooking['id'] = res.data.addBooking.id
            navigate(`/payment/${room.hotel.id}/${room.id}/3`, { state: newBooking })
        })
            .catch(err => {
                setLoading(false)
                toast.error(err, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
            })
    }

    const onToken = (token) => {
        setLoading(true)
        if (bookingExists) {
            payAmount({
                variables: {
                    tokenId: token.id,
                    bookingId: booking.id,
                    bookedBy: booking.bookedBy.id
                }
            }).then(res => {
                setLoading(false)
                let newBooking = booking
                newBooking['id'] = res.data.payAmount.id
                newBooking['paid'] = true
                navigate(`/payment/${room.hotel.id}/${room.id}/3`, { state: newBooking })
            }).catch(err => {
                setLoading(false)
                toast.error(err.message, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
            })
        }
        else {
            addBooking({
                variables: {
                    from: booking.from,
                    to: booking.to,
                    roomNumbers: booking.roomNumbers,
                    bookedBy: booking.bookedBy,
                    paid: booking.paid,
                    amount: booking.amount + 90,
                    people: booking.people,
                    room: booking.room,
                    hotel: booking.hotel
                }
            }).then(res => {
                payAmount({
                    variables: {
                        tokenId: token.id,
                        bookingId: res.data.addBooking.id,
                        bookedBy: booking.bookedBy
                    }
                }).then(res => {
                    setLoading(false)
                    let newBooking = booking
                    newBooking['id'] = res.data.payAmount.id
                    newBooking['paid'] = true
                    navigate(`/payment/${room.hotel.id}/${room.id}/3`, { state: newBooking })
                }).catch(err => {
                    setLoading(false)
                    toast.error(err.message, {
                        autoClose: 5500,
                        pauseOnHover: true
                    })
                })
            })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message, {
                        autoClose: 5500,
                        pauseOnHover: true
                    })
                })
        }
    }


    return (
        <>
            <Layout>
                {!loading ? (
                    <>
                        <div className="section">
                            <Text>Infos client</Text>
                            <Text className="small">
                                Nom: <span>{user.name}</span>
                            </Text>
                            <Text className="small">
                                Email: <span>{user.email}</span>
                            </Text>
                            <Text style={{ marginTop: '20px' }}>Informations</Text>
                            <Text className="small">
                                Hotel: <span>{room.hotel.name}</span>
                            </Text>
                            <Text className="small">
                                Chambre: <span>{room.name}</span>
                            </Text>
                            <Text className="small" style={{ margin: '-10px 0 10px 0' }}>
                                Numéro de chambre(s): <strong>1</strong>
                                {booking.roomNumbers.map(r =>
                                    (<span className="highlight" style={{ margin: '4px 2px' }}>{r}</span>)
                                )}
                            </Text>
                            <Text className="small">
                                Prix (Par chambre): <span>{room.price} €</span>
                            </Text>
                            <Text className="small">
                                Cout total: <span>{booking.amount} €</span>
                            </Text>
                        </div>
                        <div className="section">
                            <Text>Infos paiement</Text>
                            <Text className="small">
                                Cout chambre(s): <span> {booking.amount + 90} €</span>
                            </Text>
                            <Text className="small">
                                Cout total: 
                                <span> {booking.amount + 90} €</span>
                            </Text>
                        </div>
                    </>
                ) : <Loader />}

            </Layout>
            <Layout className="buttons">
                <FormButton onClick={() => navigate(`/payment/${room.hotel.id}/${room.id}/1`, { state: booking })}>
                    Revenir en arrière
                </FormButton>
                <FormButton onClick={() => handleBook()} disabled={loading}>
                    Payez plus tard
                </FormButton>
            </Layout>
        </>
    )
}

export default PaymentScreen
