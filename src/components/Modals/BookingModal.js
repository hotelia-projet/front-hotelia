import React from 'react'
import { FormButton } from '../GlobalStyles/FormStyles'
import { FlexBox, ModalBox, ModalContainer, ModalTitle } from '../GlobalStyles/ModalStyles'
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import "./animation.css"
import { getDate, getEasyDate } from '../../utils/utilFunctions'
import { Text } from '../GlobalStyles/PageStyles'
import Tippy from '@tippyjs/react'
import { ButtonsContainer } from '../../pages/Auth/ModuleStyles'
import { useNavigate } from 'react-router-dom'

const BookingModal = (props) => {

    const booking = props.booking
    const navigate = useNavigate()

    const payLink = () => {
        navigate(`/payment/${booking.hotel.id}/${booking.room.id}/1`, { state: booking })
    }

    return (
        <ModalContainer>
            <ModalBox className="modal-box">
                <CloseIcon className="close-icon"
                    onClick={() => props.setModal({ state: false, param: null, title: '' })} />
                <ModalTitle>{props.title}</ModalTitle>

                <br />

                <Text className="small">Reservee par: <span>{booking.bookedBy.name}</span></Text>
                <Text className="small">Utilisateur: <span>{booking.bookedBy.username}</span></Text>
                <Tippy interactive={true} content={getEasyDate(booking.bookedOn)} placement="bottom">
                    <Text className="small">Booked On: <span>{getDate(booking.bookedOn)}</span></Text>
                </Tippy>

                <hr />
                <br />

                <FlexBox>

                    <div style={{ flexBasis: '46%' }}>
                        <Text className="small">Hotel: <span>{booking.hotel.name}</span></Text>
                        <Text className="small">Localisation: <span>{booking.location}</span></Text>
                        <Text className="small">Chambre: <span>{booking.room.name}</span></Text>
                        <Tippy interactive={true} content={getEasyDate(booking.from)} placement="bottom">
                            <Text className="small">Depuis: <span>{getDate(booking.from)}</span></Text>
                        </Tippy>
                        <Tippy interactive={true} content={getEasyDate(booking.to)} placement="bottom">
                            <Text className="small">Vers: <span>{getDate(booking.to)}</span></Text>
                        </Tippy>
                        <Text className="small">Duree:
                            <span> {booking.days} {booking.days === 1 ? 'Day' : 'Days'}</span>
                        </Text>
                    </div>

                    <div style={{ flexBasis: '46%' }}>
                        <Text className="small">Chambres:
                            {booking.roomNumbers.map(r =>
                                (<span className="highlight" style={{ margin: '4px 2px' }}>{r}</span>)
                            )}
                        </Text>
                        <Text className="small">Nombre de personnes: <span>{booking.numOfPeople}</span></Text>
                        <Text className="small">Adultes: <span>{booking.people.adults}</span></Text>
                        <Text className="small">Enfants: <span>{booking.people.children}</span></Text>
                    </div>
                </FlexBox>

                <br />
                <hr />
                <br />
                <Text className="small">Prix de la chambre: <span>Rs. {booking.room.price}</span></Text>
                <Text className="small">Prix {booking.paid ? 'Paid' : 'To Be Paid'}: <span>Rs. {booking.amount}</span></Text>
                <Text className="small">Payment status:
                    <span> {booking.paid ? 'Paid' : 'Not Paid'}</span>
                </Text>
                <ButtonsContainer>
                    <FormButton>Voir les chambres</FormButton>
                    {!booking.paid ? <FormButton onClick={payLink}>Payee maintenant</FormButton> : null}
                </ButtonsContainer>
            </ModalBox>
        </ModalContainer>
    )
}

export default BookingModal
