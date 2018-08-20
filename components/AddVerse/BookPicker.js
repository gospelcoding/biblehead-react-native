import React from "react";
import { SafeAreaView } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import PickerList from "../shared/PickerList";
import BibleBook from "../../models/BibleBook";
import I18n from "../../i18n/i18n";

export default class BookPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      books: BibleBook.books()
    };
  }

  static navigationOptions = () => {
    return {
      title: I18n.t("NewVerse")
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <PickerList
          data={this.state.books}
          keyExtractor={book => book}
          itemText={book => book}
          itemPress={(book, bookId) => {
            this.props.navigation.navigate("ChapterPicker", {
              addVerse: this.props.navigation.getParam("addVerse"),
              verse: {
                bookName: book,
                bookId: bookId
              }
            });
          }}
        />
      </SafeAreaView>
    );
  }
}