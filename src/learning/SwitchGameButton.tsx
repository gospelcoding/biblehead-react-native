import React from 'react';
import {View} from 'react-native';
import {LearnGame, settingsSlice} from '../settings/Settings';
import {useDispatch} from 'react-redux';
import cardsSvg from './cardsIcon';
import hideWordsSvg from './hideWordsIcon';
import BHButton from '../components/BHButton';

interface IProps {
  game: LearnGame;
}

export default function SwitchGameButton(props: IProps) {
  const dispatch = useDispatch();

  const buttonParams = getButtonParams(props.game);
  return (
    <View style={{flexDirection: 'row'}}>
      {buttonParams.map((params) => (
        <View style={{padding: 8}} key={params.game}>
          <BHButton
            onPress={() => dispatch(settingsSlice.actions.toggleLearnGame())}
            svg={params.svg}
            title={params.game}
            size="big"
          />
        </View>
      ))}
    </View>
  );
}

function getButtonParams(currentGame: LearnGame) {
  let buttonParams = [];
  if (currentGame != 'HideWords')
    buttonParams.push({
      game: 'HideWords',
      svg: hideWordsSvg,
    });
  if (currentGame != 'ShuffleWords')
    buttonParams.push({
      game: 'ShuffleWords',
      svg: cardsSvg,
    });
  return buttonParams;
}
