import React, { useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../../components/SearchBar/SearchBar'
import ListHeader from './ListHeader'
import ListItem from "./ListItem"
import { Text } from "../../components/GlobalStyles/PageStyles"
import Loader from '../../components/Loaders/Loader'

const Container = styled.div`
    margin-top: 20px;

`

const BookingsList = (props) => {

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const listItems = ['Hotel', 'Chambre', 'Date d\'arrivée', 'Date de départ', 'Date de réservation', 'Montant', 'Payé', 'Actions']

    const curDate = new Date().setHours(0, 0, 0, 0)

    let upcomingBookings = props.bookings ? props.bookings.filter(b => new Date(b.from) > curDate) : []
    let oldBookings = props.bookings ? props.bookings.filter(b => new Date(b.from) <= curDate) : []

    upcomingBookings = upcomingBookings.filter(b => {
        return b.hotel.name.toLowerCase().includes(query.toString().toLowerCase())
    })
    oldBookings = oldBookings.filter(b => {
        return b.hotel.name.toLowerCase().includes(query.toString().toLowerCase())
    })

    return (
        <Container>
            <SearchBar
                query={query}
                setQuery={setQuery}
                placeholder="Rechercher des réservations par nom d'hôtel..." />

            <Text style={{ fontSize: '20px', margin: '26px 0' }}>Nouvelles réservations</Text>
            <ListHeader list={listItems} />
            {!loading ? upcomingBookings.map(booking =>
                <ListItem key={booking.id}
                    data={booking}
                    setLoading={setLoading}
                    loading={loading}
                    setModal={props.setModal} />
            ) : <Loader />}
            {upcomingBookings.length === 0 &&
                <Text className="small" style={{ textAlign: 'center', marginTop: '20px' }}>Vous n'avez pas de réservation</Text>}

            <br/>

            <Text style={{ fontSize: '20px', margin: '26px 0' }}>Anciennes réservations</Text>
            <ListHeader list={listItems} />
            {!loading ? oldBookings.map(booking =>
                <ListItem key={booking.id}
                    data={booking}
                    setLoading={setLoading}
                    loading={loading}
                    setModal={props.setModal} />
            ) : <Loader />}
            {oldBookings.length === 0 &&
                <Text className="small" style={{ textAlign: 'center', marginTop: '20px' }}>Vous n'avez pas de réservation</Text>}
        </Container>
    )
}

export default BookingsList
