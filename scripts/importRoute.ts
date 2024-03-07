﻿import fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
// @ts-ignore
import { importRoute } from '../../src/server/decodeRoute.js'
import { mdtDungeonIndexToDungeonKey } from '../src/code/mdtUtil'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const testString =
  '!fE5spUTrqq4)o5IxmVFCmogWixKncd8rI9fLZMilfOLY25Y(Bptx90CAzBadSyfzvK8B6MdloC2o)NZtp(0(9p9WLdR)38oNDE6lll)tBR5P7E8Xth)WY5NF60X5DbFinp9WPdNo)(7oSSUU87h3FIUa3Dz90Vr6pD8JZV(BoMh)A7uNxNN(8DhUSqh(dxoFE5467VC4azj7pD5(dlFEPP1gd)BZ852bVZQ(3UinS2LM35B76PtEN1XYwOtGAhcF0o8N1sA(Ug2j02Hood)Rn3)n2)TGF5YyEA)E)Y(9abBN6NUd)oa2jy1JbRrO35Uni(jujM1LnAJsGVevuBf0jYAGzvlkIoKSX1vKFrHoDDJiQhNsxsk)EzlJ3rzjNtVV7XFbC1PbGnGHvJzF0UIEf)R)N0lQ4oWwlRpEtQXPmSl6XEwTZO43FFR47NUUDJwIrF(1RbWxUW3uPY4)7brJ7ErsMECc8DKwfIEtMVYLVzOGQvUOHTwfqe4P1r(mRsZ)NpLQnH6E)vtP4Q1PBt7CHFqTqZxWZaxn1WF1tvU0vEXVVn58x3prnjiUZY3bC6M(2TtzofFEovr7M)rpSU18Cx18k4YuXLzDl55nxo(XLthruL10sFwxw(eLLD)80ZlhwEyLcah3mMo)0(13TF)ZlRp)DJeChPF9xx(kf8T8X7o(YTNpDzD5LBBrQRVC7LJpUCE551N(0DK46F1(3B(1)4TVB30l36u)5NNoD)F3gcBKMoWBnfI2BWJ7tVkKT3eP(tt0Fdcczr8SNiMgIzsmsNtPlwOrUi2MySPAbQmKzwUBmOdVjhuYax9g(bFwMMUMhYfLmHmzPnDMUShznBYoLmHm5HSGmIjLBYjLmHmfVHMeiiZy(Li7ndzpqMPsWlilyk(MCqjdKLBAXWEgPhhsEixuYeYSHoXGPltjb2HStjtizmHqxU12cXHCsjtiZbQeccskUVUjhnd5iqMW0cbz7cg9d5Gsgil4efKTslMhYfLmHSyObvIrgOMCYoKDkzczb3wtHUm9IR4qoPKjKfEZsxUHpv3KZMHCgitqwqsZ59d5Gsgil0GkliBfFopKlkzcz1q3wlmYi22oKDkzcz1sTNsOltV3ooKtkzczfT(sPl3AeL6MC1mKRazeYcYwXx9d5GsgiZubxfKTjh18qUOKbYkhfiml90XndN2OHnASSbZnH8atuzK0gzYatITMs3GYem1HrpiInOKOObfVThfL4JYRmcAdapZNTaNgj2SYOOna8kmCc8mTJvz40geCRLMOyDc8kTtuzK0geClIgS9OPmFu1HrpCInO0POftaT94jES79kJG2aWtSrQBqfOpRmkAdaVGAkiWPvSfSkdN2GG7m82cC66szvBgjTbb354xAiWPwcLxjgrJYGsSIUaBWWlOaJELrqBa489)ESvbZmIzLrrBa4829OlKUztwLHtBqW9gWljWPQLYV2msAdcUNFPxsGtTekdtmYgLbLIf9bmzOhJv5D8kJG2aWJOV1JY45R5SYOOnaC(EtpoR)oARYWPna8kBiWPwsjQmsAdcEalvXwe4yN6WOAuguYwmGLSyRcC66szBBgbTbbpWlDHJ3AVXHEWPMvgfTbGJz(ooHRy4LHyvgoTbGJUGJt443Q5qcNyK0ge82I0OLUye4jAN6WWAugiHlYlLXkWl0oELrqBqWJ8QCScC6RdrcNyu0gaowsJJt4kiJYHeoXWPnaCSSghNWv4Xos4eJK2GGN4riNWvWBaCiHRB4nkdKWLCSHaNAjiHtmcAdcEclXX5f44OYkJI2aWXYCCCcxbRz1HeoXWPnaC8mVJt4koE5NrLrsBqWZ89FoHJxnJdjCDJOrzGeU(cCJcC66IeoXiOni48cJCrbovTiHtmkAdahVf1Le4ulbjCIHtBa4y5pooHR45DIkJK2GGxWsGCCcxPVM86WGt46giHRWFedNWvO363(KPhN1FYmMf6N5p)614lA2VN)i52DSxrRkRj3)MRlp9480VS)8536)Y58k9vKZ))d'

const route = await importRoute(testString)
// @ts-ignore
const dungeonKey = mdtDungeonIndexToDungeonKey[route.value.currentDungeonIdx]

fs.writeFileSync(
  `${__dirname}/../../src/data/mdtRoutes/${dungeonKey}_mdt_route.json`,
  JSON.stringify(route),
)
