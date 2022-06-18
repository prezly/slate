/** @jsx jsx */

import { Alignment } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Paragraph', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:paragraph align={Alignment.LEFT}>
                    <h-text>Left</h-text>
                </h:paragraph>
                <h:paragraph align={Alignment.CENTER}>
                    <h-text>Center</h-text>
                </h:paragraph>
                <h:paragraph align={Alignment.RIGHT}>
                    <h-text>Right</h-text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph align={Alignment.LEFT}>
                    <h-text>Left</h-text>
                </h:paragraph>
                <h:paragraph align={Alignment.CENTER}>
                    <h-text>Center</h-text>
                </h:paragraph>
                <h:paragraph align={Alignment.RIGHT}>
                    <h-text>Right</h-text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should properly normalize deeply nested paragraphs', () => {
        const editor = (
            <editor>
                <paragraph>
                    <h-text>Bonjour Sylvain, </h-text>
                </paragraph>
                <paragraph>
                    <paragraph>
                        <h-text></h-text>
                    </paragraph>
                </paragraph>
                <paragraph>
                    <h-text>{"J'espère que vous allez bien ?"}</h-text>
                    <paragraph>
                        <h-text></h-text>
                    </paragraph>
                    <paragraph>
                        <paragraph>
                            <h-text></h-text>
                        </paragraph>
                    </paragraph>
                    <paragraph>
                        <h-text>
                            Je me permets de vous contacter car je souhaitais vous proposer de vous
                            entretenir avec{' '}
                        </h-text>
                        <link href="https://www.linkedin.com/in/bernhardney/">
                            <h-text bold>Bernhard Ney</h-text>
                        </link>
                        <h-text bold>, Directeur International de </h-text>
                        <link href="https://www.comatch.com/fr/">
                            <h-text bold>COMATCH</h-text>
                        </link>
                        <h-text bold>
                            , premier réseau de consultants et experts indépendants en Europe.{' '}
                        </h-text>
                    </paragraph>
                    <paragraph>
                        <paragraph>
                            <paragraph>
                                <h-text></h-text>
                            </paragraph>
                        </paragraph>
                        <paragraph>
                            <h-text>
                                {
                                    "A la veille du reconfinement, je vous propose de faire le point avec lui sur l'industrie du conseil et le métier de consultant, qui passe traditionnellement beaucoup de temps en déplacement pour rencontrer ses clients et réaliser ses missions. Voici quelques sujets que vous pourriez aborder avec Bernhard:"
                                }
                            </h-text>
                        </paragraph>
                        <paragraph>
                            <paragraph>
                                <h-text>
                                    {
                                        "A cette occasion, il pourra également dévoiler les résultats de l'étude "
                                    }
                                </h-text>
                                <h-text italic>
                                    {
                                        'L’ADN du consultant indépendant en 2020 : Résilience et flexibilité en temps de crise'
                                    }
                                </h-text>
                                <h-text>
                                    {
                                        " (enquête réalisé avant et après le début de la crise), sur les limites et tendances du conseil indépendant en cette période d'incertitudes économiques. "
                                    }
                                </h-text>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                            </paragraph>
                            <paragraph>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                            </paragraph>
                            <paragraph>
                                <h-text bold>
                                    {
                                        "Ce pourrait également être l'occasion de faire le point sur COMATCH, son modèle et sa présence en France. "
                                    }
                                </h-text>
                            </paragraph>
                            <paragraph>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                            </paragraph>
                            <paragraph>
                                <h-text bold>COMATCH en bref</h-text>
                            </paragraph>
                            <paragraph>
                                <h-text>
                                    {
                                        "Le rôle de COMATCH est de mettre les entreprises - de la PME au grand groupes - en relation avec les profils adaptés à leurs besoins. Chacun des 10,000 profils internationaux inscrits sur le réseau a suivi un processus de sélection rigoureux pour assurer le meilleur service aux clients. Aujourd'hui le réseau enregistre plus de 10000 consultants principalement d'Europe et des Etats-Unis, mais également d'Asie ou encore d'Amérique du Sud. "
                                    }
                                </h-text>
                            </paragraph>
                            <paragraph>
                                <h-text>
                                    COMATCH répond ainsi à la quête de réactivité et de flexibilité
                                    des entreprises dans leur recherche en compétences externes et
                                    notamment dans le contexte actuel.{' '}
                                </h-text>
                            </paragraph>
                            <paragraph>
                                <h-text> </h-text>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                                <h-text>Est-ce que cette proposition vous intéresse ?</h-text>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                                <h-text> </h-text>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                                <h-text>
                                    {
                                        "Dans l'attente de votre retour, je vous souhaite une excellente fin de journée."
                                    }
                                </h-text>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                                <h-text> </h-text>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                                <h-text>Bien cordialement,</h-text>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                                <h-text> </h-text>
                                <paragraph>
                                    <h-text></h-text>
                                </paragraph>
                                <h-text>Noémie Diaz de Cerio</h-text>
                            </paragraph>
                        </paragraph>
                    </paragraph>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <paragraph>
                    <h-text>Bonjour Sylvain, </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text>{"J'espère que vous allez bien ?"}</h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text>
                        Je me permets de vous contacter car je souhaitais vous proposer de vous
                        entretenir avec{' '}
                    </h-text>
                    <link href="https://www.linkedin.com/in/bernhardney/">
                        <h-text bold>Bernhard Ney</h-text>
                    </link>
                    <h-text bold>, Directeur International de </h-text>
                    <link href="https://www.comatch.com/fr/">
                        <h-text bold>COMATCH</h-text>
                    </link>
                    <h-text bold>
                        , premier réseau de consultants et experts indépendants en Europe.{' '}
                    </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text>
                        {
                            "A la veille du reconfinement, je vous propose de faire le point avec lui sur l'industrie du conseil et le métier de consultant, qui passe traditionnellement beaucoup de temps en déplacement pour rencontrer ses clients et réaliser ses missions. Voici quelques sujets que vous pourriez aborder avec Bernhard:"
                        }
                    </h-text>
                </paragraph>
                <paragraph>
                    <h-text>
                        {"A cette occasion, il pourra également dévoiler les résultats de l'étude "}
                    </h-text>
                    <h-text italic>
                        {
                            'L’ADN du consultant indépendant en 2020 : Résilience et flexibilité en temps de crise'
                        }
                    </h-text>
                    <h-text>
                        {
                            " (enquête réalisé avant et après le début de la crise), sur les limites et tendances du conseil indépendant en cette période d'incertitudes économiques. "
                        }
                    </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text bold>
                        {
                            "Ce pourrait également être l'occasion de faire le point sur COMATCH, son modèle et sa présence en France. "
                        }
                    </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text bold>COMATCH en bref</h-text>
                </paragraph>
                <paragraph>
                    <h-text>
                        {
                            "Le rôle de COMATCH est de mettre les entreprises - de la PME au grand groupes - en relation avec les profils adaptés à leurs besoins. Chacun des 10,000 profils internationaux inscrits sur le réseau a suivi un processus de sélection rigoureux pour assurer le meilleur service aux clients. Aujourd'hui le réseau enregistre plus de 10000 consultants principalement d'Europe et des Etats-Unis, mais également d'Asie ou encore d'Amérique du Sud. "
                        }
                    </h-text>
                </paragraph>
                <paragraph>
                    <h-text>
                        COMATCH répond ainsi à la quête de réactivité et de flexibilité des
                        entreprises dans leur recherche en compétences externes et notamment dans le
                        contexte actuel.{' '}
                    </h-text>
                </paragraph>
                <paragraph>
                    <h-text> </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text>Est-ce que cette proposition vous intéresse ?</h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text> </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text>
                        {
                            "Dans l'attente de votre retour, je vous souhaite une excellente fin de journée."
                        }
                    </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text> </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text>Bien cordialement,</h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text> </h-text>
                </paragraph>
                <paragraph>
                    <h-text></h-text>
                </paragraph>
                <paragraph>
                    <h-text>Noémie Diaz de Cerio</h-text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
