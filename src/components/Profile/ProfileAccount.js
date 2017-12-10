import React, { Component } from 'react';
import { PageBlock, PageBlockGroup } from '../Page';
import { ListGroup, ListGroupItem } from '../List';
import { Row } from '../Grid';

import Currency from '../Currency';
import NumberFormat from 'react-number-format';

class ProfileAccount extends Component {
	render() {
		const {
			member
		} = this.props;

		return (
			<div className="inner-view">
				<PageBlockGroup>
					<PageBlock extension>
						<h5 className="fw-semibold">Informasi Akun Saya</h5>
					</PageBlock>
					<PageBlock>
						<ListGroup>
							<Row>
								<div className="column-6">
									<ListGroupItem>
										<p className="fw-semibold">Nama Lengkap</p>
										<p className="lead clr-primary">{member.name}</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Alamat email</p>
										<p className="lead clr-primary">{member.email}</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Nomor Telepon</p>
										<p className="lead clr-primary">{member.phone}</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Alamat</p>
										<p className="lead clr-primary">{member.address}</p>
									</ListGroupItem>
								</div>
								<div className="column-6">
									<ListGroupItem>
										<p className="fw-semibold">Tipe Kartu</p>
										<p className="lead clr-primary">{member.card.type.name}</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Nomor Kartu</p>
										<p className="lead clr-primary">
											<NumberFormat 
												displayType={'text'}
												value={member.card.id}
												format="#### #### #### ####"
											/>
										</p>
									</ListGroupItem>
									<ListGroupItem>
										<p className="fw-semibold">Saldo Saya</p>
										<p className="lead clr-primary">
											<Currency value={member.balance} />
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