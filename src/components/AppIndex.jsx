import {connect} from "inferno-redux";
import {quote} from "../store/actions/quote";

import {Loading} from "./loading/loading";

function component({fetch, quoteText, quoteAuthor, error, getQuote}) {

	return (<div className="is-horizontal-center" id="wrapper">
			<div className="column is-three-quarters is-half is-narrow has-text-centered">
				{fetch
				&& <Loading/>
				|| <div className="card" id="quote-box">

					{error
					&&  <div className="error"><h1><img src="http://img.icons8.com/dusk/100/000000/error.png"/>{error}</h1></div>
					|| <div className="card-content">
						<p id={"text"}>{quoteText}</p>
						<h2 id={"author"}>{quoteAuthor}</h2>
					</div>}

					<div className="card-footer">
						<button
							className="button is-primary card-footer-item"
							onClick={getQuote} id="new-quote">
							New quote
						</button>
						<a
							id="tweet-quote"
							className="button is-link card-footer-item"
							href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + quoteText + " " + quoteAuthor}>
							Tweet
						</a>
					</div>
				</div>}
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return state.quotes;
}

function mapDispatchToProps(dispatch) {
	return {
		getQuote: (e) => {
			e.preventDefault();
			quote(dispatch);
		}
	}
}

function mapDispachToProps(dispatch) {
	return {
		getTweet: (a) => {
			a.preventDefault();
			tween(dispatch);
		}
	}

}


export const AppIndex = connect(mapStateToProps, mapDispatchToProps)(component);
