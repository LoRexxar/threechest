import { importMdtDungeon } from './importMdtDungeon.ts'
import { DungeonKey } from '../src/data/types.ts'

export const dungeonPaths = new Map<DungeonKey, string>([
  ['aa', 'Dragonflight/AlgetharAcademy'],
  ['ad', 'BattleForAzeroth/AtalDazar'],
  ['av', 'Dragonflight/TheAzureVault'],
  ['bh', 'Dragonflight/BrackenhideHollow'],
  ['brh', 'Dragonflight/BlackRookHold'],
  ['fall', 'Dragonflight/DawnOfTheInfiniteLower'],
  ['hoi', 'Dragonflight/HallsofInfusion'],
  ['rise', 'Dragonflight/DawnOfTheInfiniteUpper'],
  ['dht', 'Legion/DarkheartThicket'],
  ['eb', 'Dragonflight/Everbloom'],
  ['nelth', 'Dragonflight/Neltharus'],
  ['nok', 'Dragonflight/TheNokhudOffensive'],
  ['rlp', 'Dragonflight/RubyLifePools'],
  ['tott', 'Dragonflight/ThroneOfTides'],
  ['uld', 'Dragonflight/UldamanLegacyOfTyr'],
  ['wcm', 'Dragonflight/WaycrestManor'],
])

for (const [key, path] of dungeonPaths) {
  importMdtDungeon(key, path)
}
