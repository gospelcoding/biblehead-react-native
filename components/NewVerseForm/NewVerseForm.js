import React from "react";
import { TextInput, SafeAreaView, StyleSheet, View } from "react-native";
import ReferenceInput from "./ReferenceInput";
import Verse from "../../models/Verse";
import BibleBook from "../../models/BibleBook";
import I18n from "../../i18n/i18n";
import update from "immutability-helper";
import VerseEditorButtons from "./VerseEditorButtons";
import LanguageModal from "./LanguageModal";

export default class NewVerseForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const bibleBooks = BibleBook.books();
    this.state = {
      page: "ref",
      singleVerse: true,
      bibleBooks: bibleBooks,
      verseLang: I18n.currentLang(),
      verse: {
        bookId: 39,
        bookName: bibleBooks[39],
        startChapter: 1,
        startVerse: 1,
        text: ""
      }
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", I18n.t("NewVerse"))
    };
  };

  updateVerse = mergeVerse => {
    this.setState(prevState => ({
      verse: update(prevState.verse, { $merge: mergeVerse })
    }));
  };

  setSingleVerse = singleVerse => {
    this.setState(prevState => {
      const mergeVerse = singleVerse
        ? { endChapter: undefined, endVerse: undefined }
        : {
            endChapter: prevState.verse.startChapter,
            endVerse: prevState.verse.startVerse + 1
          };

      return {
        singleVerse: singleVerse,
        verse: update(prevState.verse, { $merge: mergeVerse })
      };
    });
  };

  setVerseLang = code => {
    this.setState({
      verseLang: code,
      bibleBooks: BibleBook.books(code)
    });
  };

  goToPage = page => {
    this.setState({ page: page });
    if (page == "text")
      this.props.navigation.setParams({
        title: Verse.refText(this.state.verse)
      });
  };

  saveVerse = () => {
    const addVerse = this.props.navigation.getParam("addVerse");
    addVerse(this.state.verse);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LanguageModal
          langModalDisplayed={!!this.state.langModalDisplayed}
          verseLang={this.state.verseLang}
          setVerseLang={this.setVerseLang}
          hideLangModal={() => {
            this.setState({ langModalDisplayed: false });
          }}
        />
        <View style={{ flex: 1 }}>
          {this.state.page == "ref" ? (
            <ReferenceInput
              verse={this.state.verse}
              updateVerse={this.updateVerse}
              singleVerse={this.state.singleVerse}
              setSingleVerse={this.setSingleVerse}
              bibleBooks={this.state.bibleBooks}
              showLangModal={() => {
                this.setState({ langModalDisplayed: true });
              }}
              verseLang={this.state.verseLang}
            />
          ) : (
            <TextInput
              style={styles.verseTextInput}
              placeholder={I18n.t("VerseTextInputHint")}
              multiline={true}
              value={this.state.verse.text}
              onChangeText={text => {
                this.updateVerse({ text: text });
              }}
            />
          )}
        </View>
        <VerseEditorButtons
          page={this.state.page}
          goToPage={this.goToPage}
          saveVerse={this.saveVerse}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  verseTextInput: {
    flex: 1
  }
});
