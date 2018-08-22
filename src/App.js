import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      activeQuestion: "",
      activeLanguage: "",
      code: "",
      languages: ["scheme", "haskell", "prolog", "smalltalk"],
      output: ""
    };
  }

  handleChangeCode = e => {
    this.setState({ code: e.target.value });
  };

  handleKeyDown = e => {
    if (e.key === "Tab") {
      e.preventDefault();
      this.setState({ code: this.state.code + "\t" });
    }
  };

  handleSubmitCode = e => {
    e.preventDefault();
    const uri =
      process.env.REACT_APP_API_URL + this.state.activeLanguage + "/exec";
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: [this.state.code]
      })
    })
      .then(res => res.json())
      .then(data => this.setState({ output: data.output }));
  };

  handleSelectLanguage = lang => {
    this.setState({ activeLanguage: lang });
    const uri = process.env.REACT_APP_API_URL + lang + "/questions";
    fetch(uri)
      .then(res => res.json())
      .then(data => this.setState({ questions: data }));
  };

  handleSelectQuestion = (e, q) => {
    e.stopPropagation();
    const uri =
      process.env.REACT_APP_API_URL +
      this.state.activeLanguage +
      "/questions/" +
      q._id;
    fetch(uri)
      .then(res => res.json())
      .then(data => this.setState({ activeQuestion: data[0] }));
  };

  render() {
    return (
      <div>
        <div className="Navbar">
          <h1 className="Logo">Borie Quest</h1>
        </div>

        <div className="Sidebar">
          <ul>
            {this.state.languages.map(lang => (
              <li key={lang} onClick={() => this.handleSelectLanguage(lang)}>
                {lang}
                <ul>
                  {lang === this.state.activeLanguage
                    ? this.state.questions.map(q => (
                        <li
                          key={q}
                          onClick={e => this.handleSelectQuestion(e, q)}
                        >
                          {q.name}
                        </li>
                      ))
                    : null}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {this.state.activeQuestion ? (
          <div>
            <h1>{this.state.activeQuestion.name}</h1>
            <p>{this.state.activeQuestion.description}</p>

            <h3>Test Cases</h3>
            <ul>
              {this.state.activeQuestion.tests.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <div>
              <h3>Your Code</h3>
            <form onSubmit={this.handleSubmitCode}>
              <textarea
                value={this.state.code}
                onChange={this.handleChangeCode}
                onKeyDown={this.handleKeyDown}
                className="Code"
              />
              <input type="submit" value="Submit" />
            </form>
            </div>
            
            <div>
              <h1>Output</h1>
              <h3>Your Output</h3>
              <pre>{this.state.output}</pre>
              <h3>Expected Output</h3>
              <pre>{this.state.activeQuestion.output}</pre>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
