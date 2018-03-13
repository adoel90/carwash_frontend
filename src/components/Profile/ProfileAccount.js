import React, { Component } from 'react';
import { PageBlock, PageBlockGroup } from '../../components/Page';
import { ListGroup, ListGroupItem } from '../../components/List';
import { Row, Column } from '../../layouts/Grid';
// import { Row } from '../../layouts/GridOld';

import Currency from '../Currency';
import NumberFormat from 'react-number-format';


class ProfileAccount extends Component {
	render() {
		const {
			member
		} = this.props;

		// console.log(this.props.member);

		const renderMemberInformation = () => {
			if(!member.item.data.result.card.type.refund) {

				
				return (

					// <div className="column-6">
					// 	<ListGroupItem>
					// 		<p className="fw-semibold">Nama Lengkap</p>
					// 		<p className="lead clr-primary">{member.item.data.result.name}</p>
					// 	</ListGroupItem>
					// 	<ListGroupItem>
					// 		<p className="fw-semibold">Alamat email</p>
					// 		<p className="lead clr-primary">{member.item.data.result.email}</p>
					// 	</ListGroupItem>
					// 	<ListGroupItem>
					// 		<p className="fw-semibold">Nomor Telepon</p>
					// 		<p className="lead clr-primary">{member.item.data.result.phone}</p>
					// 	</ListGroupItem>
					// 	<ListGroupItem>
					// 		<p className="fw-semibold">Alamat</p>
					// 		<p className="lead clr-primary">{member.item.data.result.address}</p>
					// 	</ListGroupItem>
					// </div>

					<Column  md={6} sm={12}>
						<ListGroupItem>
							<p className="fw-semibold">Nama Lengkap</p>
							<p className="lead clr-primary">{member.item.data.result.name}</p>
						</ListGroupItem>
						<ListGroupItem>
							<p className="fw-semibold">Alamat email</p>
							<p className="lead clr-primary">{member.item.data.result.email}</p>
						</ListGroupItem>
						<ListGroupItem>
							<p className="fw-semibold">Nomor Telepon</p>
							<p className="lead clr-primary">{member.item.data.result.phone}</p>
						</ListGroupItem>
						<ListGroupItem>
							<p className="fw-semibold">Alamat</p>
							<p className="lead clr-primary">{member.item.data.result.address}</p>
						</ListGroupItem>
					</Column>


				)
            }
            
            return(
                <h1>Hai Profile Account !!!</h1>
            )
		}

		return (
			<div className="inner-view">
				<PageBlockGroup>
					<PageBlock extension>
						<h3 className="fw-semibold">Akun Saya</h3>
						<p>Berikut merupakan informasi pribadi Anda yang terdaftar pada kartu member.</p><br/>
					</PageBlock>
					<PageBlock>
						<ListGroup>
							<Row>
								{ renderMemberInformation() }


								{/* <div className="column-6">
									<ListGroupItem>
										<p className="fw-semibold">Tipe Kartu</p>
										<p className="lead clr-primary">{member.item.data.result.card.type.name}</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Nomor Kartu</p>
										<p className="lead clr-primary">
											<NumberFormat 
												displayType={'text'}
												// value={memberData.card.id}
												value={member.item.data.result.card.id}
												format="#### #### #### ####"
											/>
										</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Saldo Saya</p>
										<p className="lead clr-primary">
											<Currency value={member.item.data.result.balance} />
										</p>
									</ListGroupItem>
									<small className="clr-passive">Untuk pengisian ulang saldo, Anda dapat melakukannya di counter kasir.</small>
								</div> */}

								<Column  md={6} sm={12}>
									<ListGroupItem>
										<p className="fw-semibold">Tipe Kartu</p>
										<p className="lead clr-primary">{member.item.data.result.card.type.name}</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Nomor Kartu</p>
										<p className="lead clr-primary">
											<NumberFormat 
												displayType={'text'}
												// value={memberData.card.id}
												value={member.item.data.result.card.id}
												format="#### #### #### ####"
											/>
										</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Saldo Saya</p>
										<p className="lead clr-primary">
											<Currency value={member.item.data.result.balance} />
										</p>
									</ListGroupItem>
									<br />
									<small className="clr-passive"><i>Untuk pengisian ulang saldo, Anda dapat melakukannya di counter kasir.</i></small>
								</Column>
								
							</Row>
						</ListGroup>
					</PageBlock>
				</PageBlockGroup>
			</div>
		);
	}
}

export default ProfileAccount;