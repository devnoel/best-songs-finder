"use strict"

const { Song } = require("../model")

const oneSong = [
    new Song("re_hash", 197812)
]

const bestOfOneSong = ["re_hash"]

const songs = [
    new Song("re_hash", 197812)
  , new Song("5_4", 78906)
  , new Song("tomorrow_comes_today", 189518)
  , new Song("new_genious", 39453)
  , new Song("clint_eastwood", 210492)
  , new Song("man_research", 26302)
  , new Song("punk", 22544)
  , new Song("sound_check", 19727)
  , new Song("double_bass", 17535)
  , new Song("rock_the_house", 18782)
  , new Song("19_2000", 198189)
  , new Song("latin_simone", 13151)
]

const bestOfSongs = [
    "clint_eastwood"
  , "19_2000"
  , "re_hash"
  , "tomorrow_comes_today"
  , "5_4"
  , "new_genious"
  , "man_research"
  , "punk"
  , "sound_check"
  , "rock_the_house"
  , "double_bass"
  , "latin_simone"
]

const bestAndWorstFirst = [
    "clint_eastwood" //110492
  , "19_2000" //98189
  , "re_hash" //97812
  , "tomorrow_comes_today" //89518
  , "latin_simone" //86849
  , "double_bass" //82465
  , "rock_the_house" //81218
  , "sound_check" //80273
  , "punk" //77456
  , "man_research" //73698
  , "new_genious" //60547
  , "5_4" //21094
]

const lastSongsUprated = [
    "19_2000" //298189
  , "clint_eastwood" //250492
  , "tomorrow_comes_today" //209518
  , "re_hash" //197812
  , "latin_simone" //123151
  , "rock_the_house" //108782
  , "double_bass" //97535
  , "sound_check" //89727
  , "5_4" //88906
  , "punk" //82544
  , "man_research" //76302
  , "new_genious" //69453
]

const zipfSortedSongs = [
    "19_2000" //2180079
  , "clint_eastwood" //1052460
  , "tomorrow_comes_today" //568554
  , "re_hash" //197812
  , "rock_the_house" //187820
  , "sound_check" //157816
  , "double_bass" //157815
  , "5_4" //157812
  , "new_genious" //157812
  , "man_research" //157812
  , "latin_simone" //157812
  , "punk" //157808
]

const songsWithSameFreqs = [
    new Song("re_hash", 150)
  , new Song("5_4", 135)
  , new Song("tomorrow_comes_today", 150)
  , new Song("new_genious", 130)
  , new Song("clint_eastwood", 200)
  , new Song("man_research", 125)
  , new Song("punk", 125)
  , new Song("sound_check", 125)
  , new Song("double_bass", 115)
  , new Song("rock_the_house", 125)
  , new Song("19_2000", 200)
  , new Song("latin_simone", 115)
]

const bestOfSongsWithSameFreqs = [
    "clint_eastwood"
  , "19_2000"
  , "re_hash"
  , "tomorrow_comes_today"
  , "5_4"
  , "new_genious"
  , "man_research"
  , "punk"
  , "sound_check"
  , "rock_the_house"
  , "double_bass"
  , "latin_simone"
]

module.exports = {
    oneSong
  , bestOfOneSong
  , songs
  , bestOfSongs
  , bestAndWorstFirst
  , lastSongsUprated
  , zipfSortedSongs
  , songsWithSameFreqs
  , bestOfSongsWithSameFreqs
}