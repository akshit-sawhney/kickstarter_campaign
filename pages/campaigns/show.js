import React, { Component } from "react";
import { Button, Card, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            minimumContribution,
            requestsCount,
            approversCount,
            manager
        } = this.props;
        const items = [
            {
                header: manager,
                description: 'The manager created this campaign. And can create requests to draw money',
                meta: 'Address of Manager',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                description: 'You must contribute atleast this much wei to become an approver',
                meta: 'Minimum Contribution',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
                meta: 'Number of requests',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                description: 'Number of people who have already donated to the campaign',
                meta: 'Number of approvers',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                description: 'The balance is how much money the campaign has left to spend.',
                meta: 'Campaign balance (ether)',
                style: { overflowWrap: 'break-word' }
            }

        ];
        return <Card.Group items={items}></Card.Group>
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>
                                        View Request
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Layout>
        );
    }
}

export default CampaignShow;
