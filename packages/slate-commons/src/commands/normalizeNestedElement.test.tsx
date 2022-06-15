/** @jsx jsx */

import { isElementNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ElementEntry, NodeEntry } from 'slate';
import { Editor, Element } from 'slate';

import { jsx } from '../jsx';

import { normalizeNestedElement } from './normalizeNestedElement';

function withElementNormalization(editor: Editor, normalization: (entry: ElementEntry) => boolean) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry;
        if (Element.isElement(node) && normalization([node, path])) {
            return;
        }

        normalizeNode(entry);
    };
}

describe('normalizeNestedElement', () => {
    it('should lift element nodes that are only allowed on top level', function () {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:paragraph>
                        <h:text>
                            Contrary to popular belief, Lorem Ipsum is not simply random text.
                        </h:text>
                    </h:paragraph>
                    <h:paragraph>
                        <h:paragraph>
                            <h:text>
                                <cursor />
                                It has roots in a piece of classical Latin literature from 45 BC,
                            </h:text>
                        </h:paragraph>
                    </h:paragraph>
                </h:paragraph>
                <h:paragraph>
                    <h:text>making it over 2000 years old.</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>
                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        It has roots in a piece of classical Latin literature from 45 BC,
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>making it over 2000 years old.</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        withElementNormalization(editor, (entry) =>
            normalizeNestedElement(editor, entry, () => false),
        );

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should lift element nodes that are not allowed to nest', function () {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:paragraph>
                        <h:text>
                            Contrary to popular belief, Lorem Ipsum is not simply random text.
                        </h:text>
                    </h:paragraph>
                    <h:paragraph>
                        <h:paragraph>
                            <h:text>
                                <cursor />
                                It has roots in a piece of classical Latin literature from 45 BC,
                            </h:text>
                        </h:paragraph>
                    </h:paragraph>
                </h:paragraph>
                <h:paragraph>
                    <h:text>making it over 2000 years old.</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>
                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        It has roots in a piece of classical Latin literature from 45 BC,
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>making it over 2000 years old.</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        withElementNormalization(editor, (entry) =>
            normalizeNestedElement(
                editor,
                entry,
                (node) => !isElementNode(node, PARAGRAPH_NODE_TYPE),
            ),
        );

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should properly normalize deeply nested paragraphs', () => {
        /**
         * Note: this test-case is taken from the deserialization fixtures.
         * @see packages/slate-editor/src/modules/editor/__tests__/input/divs.html
         */

        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>Bonjour Sylvain, </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:paragraph>
                        <h:text></h:text>
                    </h:paragraph>
                </h:paragraph>
                <h:paragraph>
                    <h:text>{"J'espère que vous allez bien ?"}</h:text>
                    <h:paragraph>
                        <h:text></h:text>
                    </h:paragraph>
                    <h:paragraph>
                        <h:paragraph>
                            <h:text></h:text>
                        </h:paragraph>
                    </h:paragraph>
                    <h:paragraph>
                        <h:text>Je me permets de vous contacter car je souhaitais vous proposer de vous entretenir avec </h:text>
                        <h:link href="https://www.linkedin.com/in/bernhardney/"><h:text bold>Bernhard Ney</h:text></h:link>
                        <h:text bold>, Directeur International de </h:text>
                        <h:link href="https://www.comatch.com/fr/"><h:text bold>COMATCH</h:text></h:link>
                        <h:text bold>, premier réseau de consultants et experts indépendants en Europe. </h:text>
                    </h:paragraph>
                    <h:paragraph>
                        <h:paragraph>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:paragraph>
                        <h:paragraph>
                            <h:text>{"A la veille du reconfinement, je vous propose de faire le point avec lui sur l'industrie du conseil et le métier de consultant, qui passe traditionnellement beaucoup de temps en déplacement pour rencontrer ses clients et réaliser ses missions. Voici quelques sujets que vous pourriez aborder avec Bernhard:"}</h:text>
                        </h:paragraph>
                        <h:paragraph>
                            <h:paragraph>
                                <h:text>{"A cette occasion, il pourra également dévoiler les résultats de l'étude "}</h:text>
                                <h:text italic>{"L’ADN du consultant indépendant en 2020 : Résilience et flexibilité en temps de crise"}</h:text>
                                <h:text>{" (enquête réalisé avant et après le début de la crise), sur les limites et tendances du conseil indépendant en cette période d'incertitudes économiques. "}</h:text>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                            </h:paragraph>
                            <h:paragraph>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                            </h:paragraph>
                            <h:paragraph>
                                <h:text bold>{"Ce pourrait également être l'occasion de faire le point sur COMATCH, son modèle et sa présence en France. "}</h:text>
                            </h:paragraph>
                            <h:paragraph>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                            </h:paragraph>
                            <h:paragraph>
                                <h:text bold>COMATCH en bref</h:text>
                            </h:paragraph>
                            <h:paragraph>
                                <h:text>{"Le rôle de COMATCH est de mettre les entreprises - de la PME au grand groupes - en relation avec les profils adaptés à leurs besoins. Chacun des 10,000 profils internationaux inscrits sur le réseau a suivi un processus de sélection rigoureux pour assurer le meilleur service aux clients. Aujourd'hui le réseau enregistre plus de 10000 consultants principalement d'Europe et des Etats-Unis, mais également d'Asie ou encore d'Amérique du Sud. "}</h:text>
                            </h:paragraph>
                            <h:paragraph>
                                <h:text>COMATCH répond ainsi à la quête de réactivité et de flexibilité des entreprises dans leur recherche en compétences externes et notamment dans le contexte actuel. </h:text>
                            </h:paragraph>
                            <h:paragraph>
                                <h:text> </h:text>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                                <h:text>Est-ce que cette proposition vous intéresse ?</h:text>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                                <h:text> </h:text>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                                <h:text>{"Dans l'attente de votre retour, je vous souhaite une excellente fin de journée."}</h:text>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                                <h:text> </h:text>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                                <h:text>Bien cordialement,</h:text>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                                <h:text> </h:text>
                                <h:paragraph>
                                    <h:text></h:text>
                                </h:paragraph>
                                <h:text>Noémie Diaz de Cerio</h:text>
                            </h:paragraph>
                        </h:paragraph>
                    </h:paragraph>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>Bonjour Sylvain, </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>{"J'espère que vous allez bien ?"}</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>Je me permets de vous contacter car je souhaitais vous proposer de vous entretenir avec </h:text>
                    <h:link href="https://www.linkedin.com/in/bernhardney/"><h:text bold>Bernhard Ney</h:text></h:link>
                    <h:text bold>, Directeur International de </h:text>
                    <h:link href="https://www.comatch.com/fr/"><h:text bold>COMATCH</h:text></h:link>
                    <h:text bold>, premier réseau de consultants et experts indépendants en Europe. </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>{"A la veille du reconfinement, je vous propose de faire le point avec lui sur l'industrie du conseil et le métier de consultant, qui passe traditionnellement beaucoup de temps en déplacement pour rencontrer ses clients et réaliser ses missions. Voici quelques sujets que vous pourriez aborder avec Bernhard:"}</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>{"A cette occasion, il pourra également dévoiler les résultats de l'étude "}</h:text>
                    <h:text italic>{"L’ADN du consultant indépendant en 2020 : Résilience et flexibilité en temps de crise"}</h:text>
                    <h:text>{" (enquête réalisé avant et après le début de la crise), sur les limites et tendances du conseil indépendant en cette période d'incertitudes économiques. "}</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text bold>{"Ce pourrait également être l'occasion de faire le point sur COMATCH, son modèle et sa présence en France. "}</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text bold>COMATCH en bref</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>{"Le rôle de COMATCH est de mettre les entreprises - de la PME au grand groupes - en relation avec les profils adaptés à leurs besoins. Chacun des 10,000 profils internationaux inscrits sur le réseau a suivi un processus de sélection rigoureux pour assurer le meilleur service aux clients. Aujourd'hui le réseau enregistre plus de 10000 consultants principalement d'Europe et des Etats-Unis, mais également d'Asie ou encore d'Amérique du Sud. "}</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>COMATCH répond ainsi à la quête de réactivité et de flexibilité des entreprises dans leur recherche en compétences externes et notamment dans le contexte actuel. </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>Est-ce que cette proposition vous intéresse ?</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>Est-ce que cette proposition vous intéresse ? </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>{"Dans l'attente de votre retour, je vous souhaite une excellente fin de journée."}</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text> </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>Bien cordialement,</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text> </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text></h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>Noémie Diaz de Cerio</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        withElementNormalization(editor, (entry) =>
            normalizeNestedElement(
                editor,
                entry,
                (node) => !isElementNode(node, PARAGRAPH_NODE_TYPE),
            ),
        );

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
