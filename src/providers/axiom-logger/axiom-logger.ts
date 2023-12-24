import { Axiom } from '@axiomhq/js';
import {
    ConsoleLogger,
    Injectable
} from '@nestjs/common';

@Injectable()
export class AxiomLogger extends ConsoleLogger {
    static axiom: Axiom;
    static dataset: string;

    constructor() {
        super();
        if (!AxiomLogger.axiom) {
            AxiomLogger.axiom = new Axiom({
                token: process.env.AXIOM_TOKEN,
            });
            AxiomLogger.dataset = process.env.AXIOM_DATASET;
        }
    }

    setContext(context: string): void {
        super.setContext(context);
    }

    log(message: any, context = AxiomLogger.name) {
        super.log(message, context);
        AxiomLogger.axiom.ingest(AxiomLogger.dataset, { LOG: message });
    }

    error(message: any, context = AxiomLogger.name) {
        super.error(message, context);
        AxiomLogger.axiom.ingest(AxiomLogger.dataset, { ERROR: message });
    }

    warn(message: any, context = AxiomLogger.name) {
        super.warn(message, context);
        AxiomLogger.axiom.ingest(AxiomLogger.dataset, { WARN: message });
    }

    verbose(message: any, context = AxiomLogger.name) {
        super.verbose(message, context);
        AxiomLogger.axiom.ingest(AxiomLogger.dataset, { VERBOSE: message });
    }

    public logObjectorData(data: Array<Object>) {
        super.log(data);
        AxiomLogger.axiom.ingest(AxiomLogger.dataset, data);
    }
}
