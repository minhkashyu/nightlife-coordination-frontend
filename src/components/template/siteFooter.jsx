import React from 'react';
import { Container } from 'semantic-ui-react';

class SiteFooter extends React.Component {
    render() {
        var dtDate = new Date();
        return (
            <Container className="site-footer">
                <p>Copyright &copy; { dtDate.getFullYear() } <a href="http://minhta.com.au" title="Home">Minh Ta</a>. All Rights Reserved.</p>
            </Container>
        );
    }
}

export default SiteFooter;