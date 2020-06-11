## Content Atoms

Content Atoms (atoms) are a mechanism to specify content in a more structured way than just text and in a way that make then reuseable across articles. Here are are documenting the progress made as part of supporting them in DCR.

This is a work in progress.

### List of atoms

List of atoms (source: [frontend] common/app/model/content/Atom.scala)

-   AudioAtom
-   ChartAtom
-   CommonsDivisionAtom
-   ExplainerAtom
-   InteractiveAtom
-   GuideAtom
-   MediaAtom
-   ProfileAtom
-   QandaAtom
-   Quiz
-   RecipeAtom
-   ReviewAtom
-   TimelineAtom

### Atoms to Page Elements (server side)

The following is a mapping from atoms to the PageElement that is being used to transport them to DCR (server side). Note how the MediaAtom is mapped to two elements.

```
AudioAtom
    -> AudioAtomBlockElement

ChartAtom
    -> AtomEmbedUrlBlockElement

CommonsDivisionAtom

ExplainerAtom

InteractiveAtom
    -> AtomEmbedUrlBlockElement

GuideAtom
    -> ProfileAtomBlockElement

MediaAtom
    -> YoutubeBlockElement
    -> HTMLFallbackBlockElement

ProfileAtom
    -> ProfileAtomBlockElement

QandaAtom
    -> QABlockElement

Quiz

RecipeAtom

ReviewAtom

TimelineAtom
    -> TimelineBlockElement
```

### PageElements to AMP and WEB components

The following maps PageElements to the corresponding amp and web Components. This essentially shows how well atoms are supported by DCR.

```
AudioAtomBlockElement
    -> [amp] AudioAtomBlockComponent

AtomEmbedUrlBlockElement
    -> [amp] AtomEmbedUrlBlockComponent

ProfileAtomBlockElement
    -> [amp] Expandable

YoutubeBlockElement
    -> [amp] YoutubeBlockComponent
    -> [web] YoutubeBlockComponent

QABlockElement
    -> [amp] Expandable

TimelineBlockElement
    -> [amp] TimelineBlockComponent
```

### atoms-renderings

The [atoms-rendering](https://github.com/guardian/atoms-rendering) project is now used to include atom components in DCR.
