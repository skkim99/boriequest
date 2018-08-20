import React, { Component } from "react";

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      activeQuestion: "",
      activeLanguage: "",
      code: "",
      languages: ["Scheme", "Haskell", "Prolog", "Smalltalk"]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
    this.handleSelectQuestion = this.handleSelectQuestion.bind(this);
  }

  componentDidMount() {
    console.log("mounted");
  }

  handleChange(event) {
    this.setState({ code: event.target.value });
  }

  handleSubmit(event) {
    console.log("submitting code");
    event.preventDefault();
  }

  handleSelectLanguage(lang) {
    console.log('fetch questions for language',lang);
    this.setState({activeLanguage: lang})
    fetch(process.env.REACT_APP_API_URL + lang + '/questions')
    .then(res => console.log(res))
  }

  handleSelectQuestion(e,q) {
    e.stopPropagation()
    console.log('fetch question', q);
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.languages.map(lang => (
            <li key={lang} onClick={() => this.handleSelectLanguage(lang.toLowerCase())}>
              {lang}
              <ul>
                {lang === this.state.activeLanguage
                  ? this.state.questions.map(q => <li key={q} onClick={(e) => this.handleSelectQuestion(e,q)}>{q}</li>)
                  : null}
              </ul>
            </li>
          ))
          }
        </ul>

        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.code} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Code;
