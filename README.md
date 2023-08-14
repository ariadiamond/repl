# repl
A webpage that runs JavaScript locally using `eval`

## Use of `eval`
`eval` is a largely disliked function in JavaScript because of the danger it poses to the browser
(and person) running it. I don't believe we run into many of the issues that commonly plague eval:
- This is a front-end only application, meaning we can't do XSS because there is no communication
  with a server.
- Injection via URLs has to be explicitly written out (ie someone has to go to a URL with this
  hosted) and then copy in code to get the URL.
- This is not being used in privileged environments (ie there are no cookies or auth keys stored).
- Client side `eval` is similar to opening the developer console and running code there. With this,
  we are succeptible to the same kinds of attacks (provided with slightly easier access).


## Sources
- [Error colors](https://colorhunt.co/palette/00425a1f8a70bfdb38fc7300)
- [General colors](https://colorhunt.co/palette/b2a4ffffb4b4ffdeb4fdf7c3)

#### Tools
- [Create React App](https://create-react-app.dev/) - getting a react up off the ground quickly
- [acorn parser](https://github.com/acornjs/acorn/tree/master/acorn) - syntax highlighting
