import React, { Component } from 'react';
import { PageBlock, PageBlockGroup } from '../Page';
import { ListGroup, ListGroupItem } from '../List';
import { Row } from '../Grid';

import Currency from '../Currency';
import NumberFormat from 'react-number-format';

class ProfileAccount extends Component {
	render() {
		const {
			memberData
		} = this.props;

		const renderMemberInformation = () => {
			if(!memberData.card.type.refund) {
				return (
					<div className="column-6">
						<ListGroupItem>
							<p className="fw-semibold">Nama Lengkap</p>
							<p className="lead clr-primary">{memberData.name}</p>
						</ListGroupItem>
						<ListGroupItem>
							<p className="fw-semibold">Alamat email</p>
							<p className="lead clr-primary">{memberData.email}</p>
						</ListGroupItem>
						<ListGroupItem>
							<p className="fw-semibold">Nomor Telepon</p>
							<p className="lead clr-primary">{memberData.phone}</p>
						</ListGroupItem>
						<ListGroupItem>
							<p className="fw-semibold">Alamat</p>
							<p className="lead clr-primary">{memberData.address}</p>
						</ListGroupItem>
					</div>
				)
			}
		}

		return (
			<div className="inner-view">
				<PageBlockGroup>
					<PageBlock extension>
						<h5 className="fw-semibold">Akun Saya</h5>
						<p>Berikut merupakan informasi pribadi Anda yang terdaftar pada kartu member.</p>
					</PageBlock>
					<PageBlock>
						<ListGroup>
							<Row>
								{ renderMemberInformation() }
								<div className="column-6">
									<ListGroupItem>
										<p className="fw-semibold">Tipe Kartu</p>
										<p className="lead clr-primary">{memberData.card.type.name}</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Nomor Kartu</p>
										<p className="lead clr-primary">
											<NumberFormat 
												displayType={'text'}
												value={memberData.card.id}
												format="#### #### #### ####"
											/>
										</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Saldo Saya</p>
										<p className="lead clr-primary">
											<Currency value={memberData.balance} />
										</p>
									</ListGroupItem>
									<small className="clr-passive">Untuk pengisian ulang saldo, Anda dapat melakukannya di counter kasir.</small>
								</div>
							</Row>
						</ListGroup>
					</PageBlock>
				</PageBlockGroup>
			</div>
		);
	}
}

export default ProfileAccount;