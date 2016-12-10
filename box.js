'use strict';

var emptyObj = {
  creationDate: "",
  img: ".",
  ingredients: [],
  name: "",
  id: null
};

var RecipeList = React.createClass({
  displayName: 'RecipeList',

  getNewObject: function getNewObject() {
    return JSON.parse(JSON.stringify(emptyObj));
  },
  getInitialState: function getInitialState() {
    var recipes = [];
    if (window.localStorage) {
      recipes = localStorage.getItem("recipes");
      if (!recipes) recipes = testData;else recipes = JSON.parse(recipes);
      localStorage.getItem("recipes", recipes);
    }
    return {
      recipes: recipes,
      selected: null,
      selectedObject: this.getNewObject(),
      edit: false,
      show: false
    };
  },
  createRecipe: function createRecipe() {
    this.setState({
      selectedObject: this.getNewObject(),
      selected: null,
      edit: true,
      show: false
    });
  },
  removeRecipe: function removeRecipe(index) {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    this.state.recipes.splice(index, 1);
    this.setState({
      recipes: this.state.recipes
    });
    if (window.localStorage) {
      window.localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
    }
  },
  editRecipe: function editRecipe(index) {
    this.setState({
      selectedObject: this.state.recipes[index],
      edit: true,
      selected: index,
      show: false
    });
  },
  showRecipe: function showRecipe(index) {
    if (this.state.show && this.state.selected === index) this.setState({
      selected: null,
      edit: false,
      show: false,
      selectedObject: this.getNewObject()
    });else this.setState({
      selected: index,
      edit: false,
      show: true,
      selectedObject: this.state.recipes[index]
    });
  },
  cancelRecipe: function cancelRecipe() {
    this.setState({
      selectedObject: this.getNewObject(),
      selected: null,
      edit: false,
      show: false
    });
  },
  editCard: function editCard(display) {
    if (this.state.edit && this.state.selected === null || display) return React.createElement(
      'div',
      { key: this.state.selectedObject.id,
        className: 'active card' },
      React.createElement(
        'div',
        { className: 'image' },
        React.createElement('img', { src: this.state.selectedObject.img
        }),
        ' '
      ),
      ' ',
      React.createElement(
        'div',
        { className: 'content' },
        React.createElement(
          'div',
          { className: 'ui two buttons' },
          React.createElement(
            'div',
            { className: 'ui button',
              onClick: this.save },
            ' ',
            React.createElement('i', { className: 'save icon' }),
            ' Save '
          ),
          '  ',
          React.createElement(
            'div',
            { className: 'ui button',
              onClick: this.cancelRecipe },
            ' ',
            React.createElement('i', { className: 'remove icon' }),
            ' Cancel '
          ),
          ' '
        ),
        ' ',
        React.createElement(
          'div',
          { className: 'ui form' },
          React.createElement(
            'div',
            { className: 'field' },
            React.createElement(
              'label',
              null,
              ' Image URL '
            ),
            ' ',
            React.createElement('input', { defaultValue: this.state.selectedObject.img,
              onChange: this.changeInForm,
              ref: 'img',
              type: 'text',
              placeholder: '' })
          ),
          ' ',
          React.createElement(
            'div',
            { className: 'field' },
            React.createElement(
              'label',
              null,
              ' Name '
            ),
            ' ',
            React.createElement('input', { defaultValue: this.state.selectedObject.name,
              ref: 'name',
              type: 'text',
              placeholder: '',
              onChange: this.changeInForm
            }),
            ' '
          ),
          ' ',
          React.createElement(
            'div',
            { className: 'field' },
            React.createElement(
              'label',
              null,
              ' Ingredients '
            ),
            ' ',
            React.createElement('input', { defaultValue: this.state.selectedObject.ingredients.join(", "),
              ref: 'ingredients',
              type: 'text',
              placeholder: '',
              onChange: this.changeInForm
            }),
            ' '
          ),
          ' '
        ),
        ' '
      )
    );
  },
  showIngredients: function showIngredients(obj, idx) {
    if (this.state.show && this.state.selected == idx) {
      return obj.ingredients.map(function (ingredient, idx) {
        return React.createElement(
          'div',
          { key: idx + "label",
            className: 'ui fluid label' },
          ' ',
          React.createElement('i', { className: 'checkmark box icon' }),
          ' ',
          ingredient,
          ' '
        );
      });
    }
  },
  cards: function cards(obj, idx) {
    if (idx === this.state.selected && this.state.show == false) return this.editCard(true);
    return React.createElement(
      'div',
      { key: obj.id,
        className: 'card' },
      React.createElement(
        'div',
        { className: 'blurring dimmable image' },
        React.createElement(
          'div',
          { className: 'ui dimmer transition hidden' },
          React.createElement(
            'div',
            { className: 'content' },
            React.createElement(
              'div',
              { className: 'center' },
              ' ',
              React.createElement(
                'div',
                { className: 'ui circular inverted huge icon button',
                  onClick: this.showRecipe.bind(null, idx) },
                React.createElement('i', { className: 'search icon' }),
                ' '
              ),
              ' ',
              React.createElement(
                'div',
                { className: 'ui circular inverted huge icon button',
                  onClick: this.editRecipe.bind(null, idx) },
                React.createElement('i', { className: 'write icon' }),
                ' '
              ),
              ' ',
              React.createElement(
                'div',
                { className: 'ui circular inverted huge icon button',
                  onClick: this.removeRecipe.bind(null, idx) },
                React.createElement('i', { className: 'trash icon' }),
                ' '
              ),
              ' '
            ),
            ' '
          ),
          ' '
        ),
        ' ',
        React.createElement('img', { src: obj.img
        }),
        ' '
      ),
      ' ',
      React.createElement(
        'div',
        { className: 'content' },
        React.createElement(
          'a',
          { className: 'header',
            onClick: this.showRecipe.bind(null, idx) },
          ' ',
          obj.name,
          ' '
        ),
        ' ',
        React.createElement(
          'div',
          { className: 'meta' },
          React.createElement(
            'span',
            { className: 'date' },
            ' Created in ',
            obj.creationDate,
            ' '
          ),
          ' '
        ),
        ' '
      ),
      ' ',
      React.createElement(
        'div',
        { className: 'extra content' },
        React.createElement(
          'span',
          null,
          React.createElement(
            'i',
            { className: 'book icon' },
            ' '
          ),
          ' ',
          obj.ingredients.length,
          ' ingredients'
        ),
        ' ',
        this.showIngredients(obj, idx),
        ' '
      ),
      ' '
    );
  },
  save: function save() {
    var selected = this.state.selectedObject;
    var selectedIdx = this.state.selected;
    var recipes = this.state.recipes;
    var date = new Date();
    selected.creationDate = date.toDateString();
    if (!selected.id) selected.id = recipes.reduce(function (a, b) {
      return Math.max(a, b.id);
    }, 0) + 1;
    if (selectedIdx > 0) recipes[selectedIdx] = selected;else recipes.push(selected);
    this.setState({
      recipes: recipes,
      selected: null,
      edit: false,
      selectedObject: this.getNewObject()
    });
    if (window.localStorage) {
      window.localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  },
  changeInForm: function changeInForm() {
    var selected = this.state.selectedObject;
    selected.img = this.refs.img.value;
    selected.name = this.refs.name.value;
    selected.ingredients = this.refs.ingredients.value.split(",");
    this.setState({
      selectedObject: selected
    });
  },
  render: function render() {
    setTimeout(function () {
      $('.card .dimmable.image').dimmer({
        on: 'hover'
      });
      $('img').error(function () {
        this.src = "http://bit.ly/1Z2icod";
      });
    });
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'ui button',
          onClick: this.createRecipe },
        ' ',
        React.createElement('i', { className: 'plus circle icon' }),
        ' New recipe '
      ),
      React.createElement('br', null),
      ' ',
      React.createElement('br', null),
      React.createElement(
        'div',
        {
          className: 'ui centered cards' },
        this.editCard(),
        ' ',
        this.state.recipes.sort(function (a, b) {
          return b.id - a.id;
        }).map(this.cards),
        ' '
      ),
      ' '
    );
  }
});
ReactDOM.render(React.createElement(RecipeList, null), document.getElementById("app"));

// Analytics
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-66606764-13', 'auto');
ga('send', 'pageview');